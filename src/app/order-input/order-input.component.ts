import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../providers/order.service';
import { CustomerService } from '../providers/customer.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss']
})
export class OrderInputComponent implements OnInit {

  public orderForm : FormGroup;

  public salesId:string = "HBRY7DZ"

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private orderService : OrderService
  ) {
    this.orderForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      tourId: ['', Validators.required],
      salesId: ['', Validators.required],
      referral: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  submit(): void {

    const customerId = this.orderForm.get('customerId').value;
    const tourId = this.orderForm.get('tourId').value;
    const salesId = this.orderForm.get('salesId').value;
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

  testSubmit(){
    const mockOrder: Order = {
        customerId: 'hJvJymmO0yeWtRJfRrnQ',
        tourId: 'FHASDJNC',
        salesId: '71283718h',
        referral: 'Facebook',
        orderDate: new Date(),
    }

    this.orderService.addOrder(mockOrder);
  }

}
