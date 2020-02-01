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
  public showAlert: boolean = false;
  public referral = ["Facebook", "Instagram", "LINE@", "Friends and family", "Other"];
  public provinces = [
    'กรุงเทพฯ',
    'กระบี่',
    'กาญจนบุรี',
    'กาฬสินธุ์',
    'กำแพงเพชร',
    'ขอนแก่น',
    'จันทบุรี',
    'ฉะเชิงเทรา',
    'ชลบุรี',
    'ชัยนาท',
    'ชัยภูมิ',
    'ชุมพร',
    'เชียงใหม่',
    'เชียงราย',
    'ตรัง',
    'ตราด',
    'ตาก',
    'นครนายก',
    'นครปฐม',
    'นครพนม',
    'นครราชสีมา',
    'นครศรีธรรมราช',
    'นครสวรรค์',
    'นนทบุรี',
    'นราธิวาส',
    'น่าน',
    'บึงกาฬ',
    'บุรีรัมย์',
    'ปทุมธานี',
    'ประจวบคีรีขันธ์',
    'ปราจีนบุรี',
    'ปัตตานี',
    'พระนครศรีอยุธยา',
    'พะเยา',
    'พังงา',
    'พัทลุง',
    'พิจิตร',
    'พิษณุโลก',
    'เพชรบุรี',
    'เพชรบูรณ์',
    'แพร่',
    'ภูเก็ต',
    'มหาสารคาม',
    'มุกดาหาร',
    'แม่ฮ่องสอน',
    'ยโสธร',
    'ยะลา',
    'ร้อยเอ็ด',
    'ระนอง',
    'ระยอง',
    'ราชบุรี',
    'ลพบุรี',
    'ลำปาง',
    'ลำพูน',
    'เลย',
    'ศรีสะเกษ',
    'สกลนคร',
    'สงขลา',
    'สตูล',
    'สมุทรปราการ',
    'สมุทรสงคราม',
    'สมุทรสาคร',
    'สระแก้ว',
    'สระบุรี',
    'สิงห์บุรี',
    'สุโขทัย',
    'สุพรรณบุรี',
    'สุราษฎร์ธานี',
    'สุรินทร์',
    'หนองคาย',
    'หนองบัวลำภู',
    'อ่างทอง',
    'อำนาจเจริญ',
    'อุดรธานี',
    'อุตรดิตถ์',
    'อุทัยธานี',
    'อุบลราชธานี',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private afAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
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
      //day: ['', Validators.required],
      //month: ['', Validators.required],
     //year: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  checkFirstName(): boolean {
    return (!this.customerForm.controls.firstName.valid
      && (this.customerForm.controls.firstName.dirty
        || this.customerForm.controls.firstName.touched));
  }
  checkLastName(): boolean {
    return (!this.customerForm.controls.lastName.valid
      && (this.customerForm.controls.lastName.dirty
        || this.customerForm.controls.lastName.touched));
  }
  checkDay(): boolean {
    return (!this.customerForm.controls.day.valid
      && (this.customerForm.controls.day.dirty
        || this.customerForm.controls.day.touched));
  }
  checkMonth(): boolean {
    return (!this.customerForm.controls.month.valid
      && (this.customerForm.controls.month.dirty
        || this.customerForm.controls.month.touched));
  }
  checkYear(): boolean {
    return (!this.customerForm.controls.year.valid
      && (this.customerForm.controls.year.dirty
        || this.customerForm.controls.year.touched));
  }
  checkGender(): boolean {
    return (!this.customerForm.controls.gender.valid
      && (this.customerForm.controls.gender.dirty
        || this.customerForm.controls.gender.touched));
  }
  checkPhoneNumber(): boolean {
    return (!this.customerForm.controls.phoneNumber.valid
      && (this.customerForm.controls.phoneNumber.dirty
        || this.customerForm.controls.phoneNumber.touched));
  }
  checkPostal(): boolean {
    return (!this.customerForm.controls.postalCode.valid
      && (this.customerForm.controls.postalCode.dirty
        || this.customerForm.controls.postalCode.touched));
  }
  checkAddress(): boolean {
    return (!this.customerForm.controls.address.valid
      && (this.customerForm.controls.address.dirty
        || this.customerForm.controls.address.touched));
  }
  checkReferral(): boolean {
    return (!this.customerForm.controls.referral.valid
      && (this.customerForm.controls.referral.dirty
        || this.customerForm.controls.referral.touched));
  }
  checkProvince(): boolean {
    return (!this.customerForm.controls.province.valid
      && (this.customerForm.controls.province.dirty
        || this.customerForm.controls.province.touched));
  }

  submit(): void {
    const firstName = this.customerForm.get('firstName').value;
    const lastName = this.customerForm.get('lastName').value;
    const gender = this.customerForm.get('gender').value;
    //const day = this.customerForm.get('day').value;
    //const month = this.customerForm.get('month').value;
    //const year = this.customerForm.get('year').value;
    const birthDate = this.customerForm.get('date').value; //new Date(year + "-" + month + "-" + day);
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
      this.showAlert = true;
    }

  }
}
