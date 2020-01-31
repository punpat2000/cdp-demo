import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../providers/order.service';
import { CustomerService } from '../providers/customer.service';
import { Order } from '../models/order.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataShareService } from '../providers/data-share.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss']
})
export class OrderInputComponent implements OnInit, OnDestroy {

  public orderForm : FormGroup;

  public salesId:string;
  public salesName:string;
  public customerId:string;
  public customer : Customer;

  constructor(
    private formBuilder: FormBuilder,
    private dataShare : DataShareService,
    private orderService : OrderService,
    private afAuth : AngularFireAuth,
    private customerService : CustomerService,
  ) {
    this.salesId = this.afAuth.auth.currentUser.uid;
    this.salesName = this.afAuth.auth.currentUser.displayName;
    this.dataShare.currentCustomerId.subscribe(customerId =>{
      this.customerId = customerId;
      this.customerService.getCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
      .subscribe(customer =>{
        this.customer = customer;
        console.log(this.customer);
      });
    });
    
    this.orderForm = this.formBuilder.group({
      tourId: ['', Validators.required],
      referral: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  ngOnDestroy() {

  }

  submit(): void {

    const customerId = this.customerId;
    const tourId = this.orderForm.get('tourId').value;
    const salesId = this.salesId;
    const referral = this.orderForm.get('referral').value;
    const orderDate = new Date();

    if (this.orderForm.valid) {
      const order: Order = {
        customerId: customerId,
        tourId: tourId,
        salesId: salesId,
        referral: referral,
        orderDate: orderDate,
      }
      this.orderService.addOrder(order);
    } else {
      console.log(`invalid`)
    }
  }

}
