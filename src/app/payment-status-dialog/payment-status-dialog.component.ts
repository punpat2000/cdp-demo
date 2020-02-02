import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../models/order.model';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-payment-status-dialog',
  templateUrl: './payment-status-dialog.component.html',
  styleUrls: ['./payment-status-dialog.component.scss']
})
export class PaymentStatusDialogComponent implements OnInit {

  public hasPaymentData: boolean;
  public hasInvoice: boolean;
  public hasReceipt: boolean;
  public hasBankTransferReceipt:boolean;

  public order: Order;
  public orderState: number;
  public isEditable = false;


  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderData: any
  ) { }

  ngOnInit() {
    this.order = this.orderData.order;
    this.setOrderState();
    this.paymentDataCheck();
  }

  paymentDataCheck() {
    if(this.order.payment.invoice.length){
      this.hasInvoice = true;
    }
    if(this.order.payment.payEarnest){
      if(this.order.payment.bankTransferReceiptEarnest && this.order.payment.bankTransferReceiptFull) this.hasBankTransferReceipt = true;
      else {
        if(this.order.payment.bankTransferReceiptFull) this.hasBankTransferReceipt = true;
      }
    }
    if(this.order.payment.receipt.length){
      this.hasReceipt = true;
    }
  }

  setOrderState() {
    this.orderState = 0;
    if (this.order.orderStatus === 'waitingForInvoice') {
      this.orderState = 0;
    }
    else if (this.order.orderStatus === 'waitingForEarnestPayment' || this.order.orderStatus === 'waitingForFullPayment') {
      this.orderState = 1;
    }
    else if (this.order.orderStatus === 'waitingForReceipt') {
      this.orderState = 2;
    }
    else if (this.order.orderStatus === 'orderCompleted') {
      this.orderState = 3;
    }
    else {
      this.orderState = -1;
    }
  }

  paymentProgress(numberToCheck: number): string {
    if (numberToCheck === 0) {
      if (this.orderState > numberToCheck) return 'Invoice';
      else return 'Waiting for Invoice';
    }
    else if (numberToCheck === 1) {
      if (this.orderState <= numberToCheck) return 'Waiting for payment';
      else return 'Payment';
    }
    else if (numberToCheck === 2) {
      if (this.orderState <= numberToCheck) return 'Waiting for receipt';
      else return 'Receipt';
    }
    else if (numberToCheck === 3) {
      return 'Order Complete'
    }
  }

  stepIsComplete(numberToCheck: number): boolean {
    if (numberToCheck === 0) {
      if (this.orderState > numberToCheck) return true;
      else return false;
    }
    else if (numberToCheck === 1) {
      if (this.orderState <= numberToCheck) return false;
      else return true;
    }
    else if (numberToCheck === 2) {
      if (this.orderState <= numberToCheck) return false;
      else return true;
    }
    else if (numberToCheck === this.orderState && this.orderState === 3) {
      return true;
    }
    else return false;
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
    console.log('move');
  }


}
