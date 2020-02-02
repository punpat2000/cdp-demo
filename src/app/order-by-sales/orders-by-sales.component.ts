import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../providers/data-share.service';
import { CustomerService } from '../providers/customer.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { OrderService } from '../providers/order.service';
import { Order } from '../models/order.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-orders-by-sales',
  templateUrl: './orders-by-sales.component.html',
  styleUrls: ['./orders-by-sales.component.scss']
})
export class OrdersBySalesComponent implements OnInit, OnDestroy {

  public customerId:string;
  public customer:Customer;
  public showSpinner:boolean = false;
  public loadFailed:boolean = false;
  public orderArray: Array<Order>;

  public displayedColumns: string[] = ['orderId','tourId','salesId','referral','status','actions'];

  constructor(
    private dataShare : DataShareService,
    private customerService : CustomerService,
    private orderService : OrderService,
    private router : Router
  ) { 
    this.loadData();
  }

  loadData(){
    this.showSpinner = true;

    this.dataShare.currentCustomerId.subscribe(customerId =>{
      this.customerId = customerId;
      this.customerService.getCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
      .subscribe(customer =>{
        if(customer){
          this.customer = customer;
          console.log(this.customer);
        }else this.router.navigate(['/customers']);
      });
      this.orderService.getOrdersByCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
      .subscribe(orders=>{
        this.orderArray = orders;
        console.log(this.orderArray);
        this.showSpinner = false;
      });
      setTimeout(()=>{
        if(this.loadFailed === false && this.showSpinner === true){
          this.showSpinner = false;
          this.loadFailed = true;
        }
      },15000);

    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){}



}
