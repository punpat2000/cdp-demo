import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { OrderService } from '../providers/order.service';
import { CustomerService } from '../providers/customer.service';
import { Order, Payment, TravelPeriod } from '../models/order.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataShareService } from '../providers/data-share.service';
import { Customer } from '../models/customer.model';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { AuthService } from '../providers/auth.service';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Tour } from '../models/tour.model';
import { TourService } from '../providers/tour.service'
import { Router } from '@angular/router';
import { SnackBarService } from '../providers/snack-bar.service';



@Component({
  selector: 'app-order-input',
  templateUrl: './order-input.component.html',
  styleUrls: ['./order-input.component.scss']
})
export class OrderInputComponent implements OnInit, OnDestroy {

  public orderForm: FormGroup;
  public salesId: string;
  public salesName: string;
  public customerId: string;
  public customer: Customer;
  public sales: User;
  public tour: Tour;
  public showSpinner: boolean = false;
  public loadFailed: boolean = false;
  public tourNotFound: boolean = false;
  public minDateEnd:Date;
  public minDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private dataShare: DataShareService,
    private orderService: OrderService,
    private afAuth: AngularFireAuth,
    private customerService: CustomerService,
    private authService: AuthService,
    private tourService: TourService,
    private router: Router,
    private sbs: SnackBarService,
  ) { }

  ngOnInit() {
    this.minDate = new Date();
    this.minDateEnd = new Date();
    this.authService.getUserData().pipe(take(1)).subscribe(data => {
      this.sales = data;
    })
    this.salesId = this.afAuth.auth.currentUser.uid;
    this.salesName = this.afAuth.auth.currentUser.displayName;
    this.dataShare.currentCustomerId.subscribe(customerId => {
      if ((customerId === "no data")) {
        this.router.navigate(['customers']);
      }
      this.customerId = customerId;
      this.customerService.getCustomer(this.customerId).pipe(takeUntilNgDestroy(this))
        .subscribe(customer => {
          this.customer = customer;
          console.log(this.customer);
        });
    });

    this.orderForm = this.formBuilder.group({
      tourId: ['', Validators.required],
      referral: ['', Validators.required],
      personCount: ['', Validators.required,],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      payEarnest: ['', Validators.required],
      fullPaymentDate: ['', Validators.required],
      earnestPaymentDate: ['',],
      netPrice: ['', Validators.required]
    });
    this.listenToEventEmitter();
  }

  listenToEventEmitter(){
    this.orderService.getOrderServiceEventEmitter().pipe(takeUntilNgDestroy(this))
    .subscribe(event => {
      if(event==='addOrderSuccess'){
        this.sbs.openSuccessSnackBar('บันทึกออเดอร์สำเร็จ');
      } else if (event ==='addOrderFailed'){
        this.sbs.openFailSnackBar('บันทึกออเดอร์สำเร็จ กรุณาลองใหม่อีกครั้ง');
      }
    });
    this.customerService.getCustomerServiceEventEmitter().pipe(takeUntilNgDestroy(this))
    .subscribe(event => {
      if(event==='addCustomerSuccess'){
        this.sbs.openSuccessSnackBar('บันทึกข้อมูลลูกค้าสำเร็จ');
      } else if (event ==='addCustomerFailed'){
        this.sbs.openFailSnackBar('พบข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    });
    this.tourService.getAddTourEvent().pipe(takeUntilNgDestroy(this))
    .subscribe(event => {
      if(event==='addTourSuccess'){
        this.sbs.openSuccessSnackBar('บันทึกรายการทัวร์สำเร็จ');
      } else if (event === 'tourDNE'){
        this.sbs.openFailSnackBar('ไม่พบทัวร์ กรุณาลองใหม่อีกครั้ง');
      }
    });
    this.orderForm.get('startDate').valueChanges
    .subscribe(date => {
      if(date){
        this.minDateEnd = date;
      }
    })
  }
  
  ngOnDestroy() {
    this.sbs.closeSnackBar();
  }

  checkTour(): boolean {
    return (!this.orderForm.controls.tourId.valid
      && (this.orderForm.controls.tourId.dirty
        || this.orderForm.controls.tourId.touched));
  }

  setTour(id: string) {
    this.tourService.getTour(id).pipe(take(1)).subscribe(data => {
      if (data) {
        this.tour = data;
      } else {
        console.log(`error`);
      }
    });
  }

  submit(): void {
    if(!this.orderForm.valid){
      this.sbs.openFailSnackBar(`กรุณาลองใหม่อีกครั้ง`);
      return;
    }
    const customerId = this.customerId;
    const tourId = this.orderForm.get('tourId').value;
    const salesId = this.salesId;
    const referral = this.orderForm.get('referral').value;
    const orderDate = new Date();
    const personCount = this.orderForm.get('personCount').value;
    const netPrice = this.orderForm.get('netPrice').value;
    const startDate = this.orderForm.get('startDate').value;
    const endDate = this.orderForm.get('endDate').value;
    const payEarnest = this.orderForm.get('payEarnest').value;
    const fullPaymentDate = this.orderForm.get('fullPaymentDate').value;
    const earnestPaymentDate = payEarnest ? this.orderForm.get('earnestPaymentDate').value : null;

    let tourIdInput: string;
    if (this.orderForm.get('tourId').value === "") {
      tourIdInput = "noTourId";
    } else {
      tourIdInput = this.orderForm.get('tourId').value;
    }
    console.log(tourIdInput);
    this.tourService.checkTour(tourIdInput).toPromise().then(data => {
      this.showSpinner = true;
      if (data) {
        this.tourService.getTour(tourIdInput).pipe(take(1)).subscribe(data => {
          if (data) {
            this.tour = data;
            //console.log(`true`);
            if (this.orderForm.valid) {
              const travelPeriod: TravelPeriod = {
                startDate: startDate,
                endDate: endDate
              }
              const paymentFull: Payment = {
                payEarnest: false,
                earnestPaymentDate: null,
                fullPaymentDate: fullPaymentDate,
                paidEarnest: null,
                paidFull: false,
                invoice: null,
                invoiceConfirmed:false,
                receipt: null,
                receiptConfirmed:false,
                bankTransferReceiptFull: null,
                bankTransferReceiptEarnestConfirmed:false,
                bankTransferReceiptEarnest: null,
                bankTransferReceiptFullConfirmed:false,
              }
              const paymentEarnest: Payment = {
                payEarnest: true,
                earnestPaymentDate: earnestPaymentDate,
                fullPaymentDate: fullPaymentDate,
                paidEarnest: false,
                paidFull: false,
                invoice: null,
                invoiceConfirmed:false,
                receipt: null,
                receiptConfirmed:false,
                bankTransferReceiptFull: null,
                bankTransferReceiptEarnestConfirmed:false,
                bankTransferReceiptEarnest: null,
                bankTransferReceiptFullConfirmed:false,
              }
              let payment: Payment;
              payment = payEarnest ? paymentEarnest : paymentFull;
              const order: Order = {
                customerId: customerId,
                customer: this.customer,
                tourId: tourId,
                tour: this.tour,
                salesId: salesId,
                sales: this.sales,
                referral: referral,
                orderDate: orderDate,
                payment: payment,
                personCount: personCount,
                travelPeriod: travelPeriod,
                netPrice: netPrice,
                dateCompleted: null,
                orderStatus: 'waitingForInvoice'
              }
              console.log(this.tour);
              this.orderService.addOrder(order);
              this.showSpinner = false;
            } else {
              this.showSpinner = false;
            }
          } else {
            console.log(`error`);
            this.showSpinner = false;
            this.sbs.openFailSnackBar(`กรุณาลองใหม่อีกครั้ง`);
          }
        });
      }this.showSpinner = false;
    });
  }

}
