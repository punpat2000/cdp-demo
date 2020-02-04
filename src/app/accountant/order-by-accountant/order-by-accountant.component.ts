import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/providers/order.service';
import { CustomerService } from 'src/app/providers/customer.service';
import { TourService } from 'src/app/providers/tour.service';
import { Order } from 'src/app/models/order.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-by-accountant',
  templateUrl: './order-by-accountant.component.html',
  styleUrls: ['./order-by-accountant.component.scss']
})
export class OrderByAccountantComponent implements OnInit, OnDestroy {

  public ordersWaitingInvoice: Array<Order>;
  public ordersWaitingEarnestBankTransferConfirmation: Order[];
  public ordersWaitingFullBankTransferConfirmation: Order[];
  public ordersWaitingReceipt: Order[];


  // Upload task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  // File path
  path: string = "orders/";

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() { }

  loadData() {
    this.orderService.queryOrderInvoice()
      .pipe(takeUntilNgDestroy(this))
      .subscribe(orders => {
        this.ordersWaitingInvoice = orders;
        console.log(this.ordersWaitingInvoice);
      });
    this.orderService.queryOrderEarnestBankTransfer()
      .pipe(takeUntilNgDestroy(this))
      .subscribe(orders => {
        this.ordersWaitingEarnestBankTransferConfirmation = orders;
      });
    this.orderService.queryOrderFullBankTransfer()
      .pipe(takeUntilNgDestroy(this))
      .subscribe(orders => {
        this.ordersWaitingFullBankTransferConfirmation = orders;
      });
    this.orderService.queryOrderReceipt()
      .pipe(takeUntilNgDestroy(this))
      .subscribe(orders => {
        this.ordersWaitingReceipt = orders;
      });
  }

  confirmEarnestReceipt(orderId:string){
    this.orderService.confirmEarnestReceipt(orderId);
  }

  confirmFullReceipt(orderId:string){
    this.orderService.confirmFullReceipt(orderId);
  }
}
