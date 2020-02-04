import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataShareService } from '../../providers/data-share.service';
import { CustomerService } from '../../providers/customer.service';
import { Customer } from '../../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../providers/order.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentStatusDialogComponent } from '../payment-status-dialog/payment-status-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {

  public customer: Customer;
  public orderArray: Array<Order>;

  public displayedColumns: string[] = ['orderId', 'tourId', 'referral', 'status', 'actions'];
  public showSpinner: boolean = false;
  public loadFailed: boolean = false;

  constructor(
    private dataShare: DataShareService,
    private customerService: CustomerService,
    private router: Router,
    private orderService: OrderService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadData();
  }
  ngOnDestroy() { }

  loadData() {
    this.dataShare.currentCustomerId.subscribe(customerId => {
      this.showSpinner = true;
      if (customerId) {
        this.customerService.getCustomer(customerId).pipe(takeUntilNgDestroy(this))
          .subscribe(customer => {
            if (!customer) {
              this.router.navigate(['/customers']);
            }
            this.customer = customer;
          });
        this.orderService.getOrdersByCustomer(customerId).pipe(takeUntilNgDestroy(this))
          .subscribe(orders => {
            this.orderArray = orders;
            this.showSpinner = false;
          });
      }
    });
    setTimeout(() => {
      if (this.showSpinner === true && this.loadFailed === false) {
        this.showSpinner = false;
        this.loadFailed = true;
      }
    }, 10000);
  }

  openPaymentDialog(order:Order) {
    this.dialog.open(PaymentStatusDialogComponent, {
      data: {
        order: order
      }
    });
  }

  goToAddOrder(customerId:string){
    this.dataShare.changeCustomerId(customerId);
    this.router.navigate(['customers/order-input']);
  }

  dateToString(dateObj:Date):string{
    return moment(dateObj).format('DD/MM/YYYY');
  }
}
