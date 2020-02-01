import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../providers/data-share.service';
import { CustomerService } from '../providers/customer.service';
import { OrderService } from '../providers/order.service';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public customerId:string;
  public customer:Customer;
  public showSpinner:boolean = false;
  public loadFailed:boolean = false;
  public orderArray: Array<Order>;

  displayedColumns: string[] = ['orderId','tourId','salesId','referral','status'];

  constructor(
    private orderService : OrderService,
    private router : Router
  ) {
    this.loadData();
  }

  loadData(){
    this.showSpinner = true;
    this.orderService.loadAllOrders()
    .pipe(takeUntilNgDestroy(this))
    .subscribe(orders=>{
      if(orders){
        this.orderArray = orders;
      }else console.log('no data');
      this.showSpinner = false;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){}



}
