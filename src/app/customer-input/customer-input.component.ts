import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../models/customer.model'
import { CustomerService } from '../providers/customer.service';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.scss']
})
export class CustomerInputComponent implements OnInit {
  public customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      province: ['', Validators.required],
      email: [''],
      referral: ['', Validators.required],
      salesID: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(): void {

    const firstName = this.customerForm.get('firstName').value;
    const lastName = this.customerForm.get('lastName').value;
    const gender = this.customerForm.get('gender').value;
    const age = this.customerForm.get('age').value;
    const phoneNumber = this.customerForm.get('phoneNumber').value;
    const currentAddress = {
      address: this.customerForm.get('address').value,
      province: this.customerForm.get('province').value,
      postalCode: this.customerForm.get('postalCode').value,
    };
    const email = this.customerForm.get('email').value;
    const referral = this.customerForm.get('referral').value;
    const salesID = this.customerForm.get('salesID').value;
    const recordedDate = new Date();
    const order = new Array<string>();

    if (this.customerForm.valid) {
      const customer: Customer = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phoneNumber: phoneNumber,
        age: age,
        currentAddress: currentAddress,
        email: email,
        referral: referral,
        salesID: salesID,
        order: order,
        recordedDate: recordedDate,
      }
      this.customerService.addCustomer(customer);
    }
  }

}
