import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerServiceModel } from '../models/customer-service.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements CustomerServiceModel {

  public customerServiceEventEmitter: Subject<string> = new Subject<string>();

  constructor(
    private afs: AngularFirestore
  ) { }

  getCustomerServiceEventEmitter(): Observable<string> {
    return this.customerServiceEventEmitter.asObservable();
  }

  addCustomer(cus: Customer): void {
    this.afs.collection(`customers`)
      .add(cus)
      .then(data => {
        this.afs.doc(`customers/${data.id}`).update({ customerId: data.id }).then(() => {
          console.log(`id added to customer`);
        });
        this.customerServiceEventEmitter.next('addCustomerSuccess');
        console.log('customer added!');
      }).catch(err => {
        this.customerServiceEventEmitter.next('addCustomerFailed');
        console.log('error', err);
      });
  }

  updateCustomer(newCus: Customer): void {
    if (this.checkCustomer(newCus.customerId)) {
      this.afs.doc(`customers/${newCus.customerId}`).update(newCus)
        .then(() => console.log('customer updated successfully'))
        .catch(err => {
          this.customerServiceEventEmitter.next('addCustomerFailed');
          console.log('error', err)
        });
    } else {
      return;
    }
  }
  getCustomer(id: string): Observable<Customer> {
    if (this.checkCustomer(id)) {
      return this.afs.doc<Customer>(`customers/${id}`).valueChanges();
    } else {
      return of(null);
    }
  }

  checkCustomer(customerId: string): Observable<boolean> {
    return from(this.afs.doc(`customers/${customerId}`).ref.get()
      .then(data => {
        if (data.exists) {
          this.customerServiceEventEmitter.next('customerExists');
          return true;
        } else {
          this.customerServiceEventEmitter.next('customerDNE');
          console.log('customer not found');
          return false;
        }
      }));
  }

  getCustomerBySales(salesId: string): Observable<Customer[]> {
    const customersCollection = this.afs.collection<Customer>('customers', ref => ref.where('salesId', '==', salesId));
    return customersCollection.valueChanges();
  }
}
