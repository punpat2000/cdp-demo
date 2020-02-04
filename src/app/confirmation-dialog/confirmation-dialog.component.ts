import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderService } from '../providers/order.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
    ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  confirmDialog(){
    if(this.data.documentName === "invoice"){
      this.confirmInvoice();
      console.log('confirm invoice');
    }else if(this.data.documentName === "earnest payment receipt"){
      console.log('confirm earnest');
    }else if(this.data.documentName === "full payment receipt"){
      console.log('confirm full');
    }else if(this.data.documentName === "receipt"){
      this.confirmReceipt();
      console.log('receipt');
    }
  }

  confirmInvoice() {
    this.orderService.confirmInvoice(this.data.orderId);
    this.dialogRef.close();
  }
  confirmReceipt() {
    this.orderService.confirmReceipt(this.data.orderId);
    this.dialogRef.close();
  }

}
