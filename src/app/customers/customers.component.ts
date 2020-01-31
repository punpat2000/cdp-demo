import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../providers/customer.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { Router } from '@angular/router';
import { DataShareService } from '../providers/data-share.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  public customerArray: Array<Customer>;

  displayedColumns: string[] = ['customerId','firstName', 'lastName', 'gender', 'phoneNumber', 'province', 'email', 'referral', 'actions'];

  public salesId = '3';

  constructor(
    private customerService : CustomerService,
    private dataShare : DataShareService,
    private router : Router,
  ) {
    this.customerService.getCustomerBySales(this.salesId).pipe(takeUntilNgDestroy(this))
    .subscribe(data=>{
      if(data && data.length){
        this.customerArray = data;
      }
      console.log(this.customerArray);
    });
  }

  viewOrders(customerId:string){
    this.dataShare.changeCustomerId(customerId);
    this.router.navigate(['customers/orders']);
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }


}
