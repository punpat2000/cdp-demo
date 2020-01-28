import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../providers/customer.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  public customers: Array<Customer>;
  public salesId = '3';
  constructor(
    private customerService : CustomerService,
  ) {
    this.customerService.getCustomerBySales(this.salesId).pipe(takeUntilNgDestroy(this))
    .subscribe(data=>{
      if(data && data.length){
        this.customers = data;
      }
      console.log(this.customers);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }


}
