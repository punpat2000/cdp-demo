import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../providers/customer.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { Router } from '@angular/router';
import { DataShareService } from '../providers/data-share.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {

  public customerArray: Array<Customer>;
  public showSpinner:boolean = false;
  public loadFailed:boolean = false;

  displayedColumns: string[] = ['customerId','firstName', 'lastName', 'gender', 'phoneNumber', 'province', 'email', 'referral', 'actions'];

  
  constructor(
    private customerService : CustomerService,
    private dataShare : DataShareService,
    private router : Router,
    private afAuth : AngularFireAuth
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.showSpinner = true;
    this.customerService.getCustomerBySales(this.afAuth.auth.currentUser.uid)
    .pipe(takeUntilNgDestroy(this))
    .subscribe(data=>{
      if(data && data.length){
        this.customerArray = data;
      }
      this.showSpinner = false;
      console.log(this.customerArray);
    });
    setTimeout(()=>{
      if(this.showSpinner === true && this.loadFailed === false){
        this.showSpinner = false;
        this.loadFailed = true;
      }
    },15000);
  }

  viewOrders(customerId:string){
    this.dataShare.changeCustomerId(customerId);
    this.router.navigate(['customers/orders']);
  }

  addOrder(customerId:string){
    this.dataShare.changeCustomerId(customerId);
    this.router.navigate(['customers/order-input']);
  }

  goToCustomer(customerId:string){
    this.dataShare.changeCustomerId(customerId);
    this.router.navigate(['customers/customer-info']);
  }


  ngOnDestroy(){
  }


}
