import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../models/customer.model'
import { CustomerService } from '../providers/customer.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-customer-input',
  templateUrl: './customer-input.component.html',
  styleUrls: ['./customer-input.component.scss']
})
export class CustomerInputComponent implements OnInit {
  public customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private afAuth: AngularFireAuth
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      province: ['', Validators.required],
      email: [''],
      referral: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(): void {

    const firstName = this.customerForm.get('firstName').value;
    const lastName = this.customerForm.get('lastName').value;
    const gender = this.customerForm.get('gender').value;
    const day = this.customerForm.get('day').value;
    const month = this.customerForm.get('month').value;
    const year = this.customerForm.get('year').value;
    const birthDate = new Date(year+"-"+month+"-"+day);
    const phoneNumber = this.customerForm.get('phoneNumber').value;
    const currentAddress = {
      address: this.customerForm.get('address').value,
      province: this.customerForm.get('province').value,
      postalCode: this.customerForm.get('postalCode').value,
    };
    const email = this.customerForm.get('email').value;
    const referral = this.customerForm.get('referral').value;
    const salesId = this.afAuth.auth.currentUser.uid;
    const recordedDate = new Date();
    const order = new Array<string>();

    if (this.customerForm.valid) {
      const customer: Customer = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phoneNumber: phoneNumber,
        birthDate: birthDate,
        currentAddress: currentAddress,
        email: email,
        referral: referral,
        salesId: salesId,
        order: order,
        recordedDate: recordedDate,
      }
      this.customerService.addCustomer(customer);
    } else {
      console.log(`invalid`)
    }
    
  }
}
