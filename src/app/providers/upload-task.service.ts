import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { file } from '../models/order.model';
import { PaymentService } from './payment.service';

@Injectable({providedIn:'root'})
export class UploadTaskService {

  public file: File;
  public path: string;
  public documentName: string;
  public orderId: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private paymentService: PaymentService
  ) { }


  startUpload() {

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