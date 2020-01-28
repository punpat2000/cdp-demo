import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerServiceModel } from '../models/customer-service.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService implements CustomerServiceModel {

  constructor(
    private afs: AngularFirestore
  ) { }

  addCustomer(cus: Customer): void {
    this.afs.collection(`customers`)
      .add(cus)
      .then(data => {
        this.afs.doc(`customers/${data.id}`).update({ customerId: data.id }).then(() => {
          console.log(`id added to customer`);
        })
        console.log('customer added!');
      }).catch(err => {
        console.log('error', err);
      });
  }

  updateCustomer(newCus: Customer): void {
    if (this.checkCustomer(newCus.customerId)) {
      this.afs.doc(`customers/${newCus.customerId}`).update(newCus)
        .then(() => console.log('customer updated successfully'))
        .catch(err => console.log('error', err));
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

  checkCustomer(id: string): Observable<boolean> {
    return from(this.afs.doc(`customers/${id}`).ref.get()
      .then(data => {
        if (data.exists) {
          return true;
        } else {
          console.log('customer not found');
          return false;
        }
      }))
  }
}
