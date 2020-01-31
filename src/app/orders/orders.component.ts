import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../providers/data-share.service';
import { CustomerService } from '../providers/customer.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { OrderService } from '../providers/order.service';
import { Order } from '../models/order.model';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  private customerId:string;
  private customer:Customer;

  public orderArray: Array<Order>;

  displayedColumns: string[] = ['orderId','tourId','salesId','referral'];

  constructor(
    private dataShare : DataShareService,
    private customerService : CustomerService,
    private orderService : OrderService
  ) { 
    this.dataShare.currentCustomerId.subscribe(customerId =>{
      this.customerId = customerId;
      this.customerService.getCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
      .subscribe(customer =>{
        this.customer = customer;
        console.log(this.customer);
      });

      this.orderService.getOrdersByCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
      .subscribe(orders=>{
        this.orderArray = orders;
        console.log(this.orderArray);
      });
    });
    
  }

  ngOnInit() {
  }

  ngOnDestroy(){}



}
