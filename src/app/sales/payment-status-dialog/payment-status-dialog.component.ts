import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { MatStepper } from '@angular/material';
import { OrderService } from '../../providers/order.service';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { UploadTaskService } from '../../providers/upload-task.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-payment-status-dialog',
  templateUrl: './payment-status-dialog.component.html',
  styleUrls: ['./payment-status-dialog.component.scss']
})
export class PaymentStatusDialogComponent implements OnInit, OnDestroy {

  public hasPaymentData: boolean;
  public hasInvoice: boolean;
  public hasReceipt: boolean;
  public hasBankTransferReceipt: boolean;

  public order: Order;
  public orderState: number;
  public isEditable = false;
  public targetFiles: FileList;

  public enableEarnestUploadProgress: boolean = false;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orderData: any,
    private orderService: OrderService,
    public uploadTaskService: UploadTaskService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initializeOrder();
  }

  switchUploader(uploader: string) {
    if (uploader === "earnest") {
      this.enableEarnestUploadProgress = true;
    } else if (uploader === "full") {
      this.enableEarnestUploadProgress = false;
    }
  }

  paymentDataCheck() {
    if (this.order.payment.invoice) {
      this.hasInvoice = true;
    }
    if (this.order.payment.payEarnest) {
      if (this.order.payment.bankTransferReceiptEarnest && this.order.payment.bankTransferReceiptFull) this.hasBankTransferReceipt = true;
      else {
        if (this.order.payment.bankTransferReceiptFull) this.hasBankTransferReceipt = true;
      }
    }
    if (this.order.payment.receipt) {
      this.hasReceipt = true;
    }
  }

  detectFiles(event, documentName: string, path: string, orderId: string) {
    this.targetFiles = event.target.files;
    console.log('file chosen');
    console.log(orderId);
    if (this.targetFiles.item(0)) {
      this.uploadTaskService.orderId = orderId;
      this.uploadTaskService.documentName = documentName;
      this.uploadTaskService.path = path;
      this.uploadTaskService.file = this.targetFiles.item(0);
      this.uploadTaskService.startUpload();
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
  initializeOrder() {
    this.orderService.getOrder(this.orderData.order.orderId)
      .pipe(takeUntilNgDestroy(this))
      .subscribe(order => {
        this.order = order;
        this.setOrderState();
        this.paymentDataCheck();
      });
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

  confirmReceipt(orderId: string) {
    this.orderService.confirmReceipt(orderId);
  }

  openConfirmationDialog(documentName:string) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        documentName: documentName,
        orderId: this.order.orderId
      }
    });
  }

  ngOnDestroy() { }

}
