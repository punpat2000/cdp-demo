import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { file } from 'src/app/models/order.model';
import { PaymentService } from 'src/app/providers/payment.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() path: string;
  @Input() documentName: string;
  @Input() orderId: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.startUpload(this.documentName);
  }

  startUpload(documentName: string) {

    // The storage path
    const path = `${this.path}/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        let uploadedFile: file = {
          downloadURL: this.downloadURL,
          path: path
        }
        if(this.documentName === "invoice"){
          
          this.paymentService.uploadInvoice(this.orderId, uploadedFile);
          console.log('invoice updated');
        }else if( this.documentName === "earnestBankReceipt"){
          
          this.paymentService.uploadEarnestBankReceipt(this.orderId, uploadedFile);
          console.log('earnestBankReceipt updated');
        }else if(this.documentName === "fullBankReceipt"){
          
          this.paymentService.uploadFullBankReceipt(this.orderId, uploadedFile);
          console.log('fullBankReceipt updated');
        }else if(this.documentName === "receipt"){
          
          this.paymentService.uploadReceipt(this.orderId, uploadedFile);
          console.log('receipt updated');
        }
        this.afs.collection('files').add(uploadedFile);
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}