import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../providers/data-share.service';
import { CustomerService } from '../providers/customer.service';
import { OrderService } from '../providers/order.service';
import { Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { PageEvent } from '@angular/material/paginator';

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

  public displayedColumns: string[] = ['orderId','tourId','salesId','referral','status'];

  //MatPaginator---
  length:number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 50];
  //MatPaginator---

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private orderService : OrderService,
    private router : Router
  ) {
    this.loadData();
  }
  statusThai(s:string):string{
    if(s==='waitingForInvoice'){
      return 'รอ Invoice';
    } else if ('waitingForEarnestPayment'){
      return 'รอค่ามัดจำ';
    } else if ('waitingForFullPayment'){
      return  'รอการชำระเต็มจำนวน';
    } else if ('waitingForReceipt'){
      return 'รอใบเสร็จ';
    } else if ('orderCompleted'){
      return 'ออเดอร์สมบูรณ์';
    } else {
      return null;
    }
  }
  loadData(){
    this.showSpinner = true;
    this.orderService.loadAllOrders()
    .pipe(takeUntilNgDestroy(this))
    .subscribe(orders=>{
      if(orders){
        this.orderArray = orders;
        this.length = this.orderArray.length;
      }else {
        this.length = 0
        console.log('no data');
      }
      this.showSpinner = false;
    });
  }
  ngOnDestroy(){}

  ngOnInit(){}



}
