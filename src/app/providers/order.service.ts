import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerServiceModel } from '../models/customer-service.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({providedIn : 'root'})
export class OrderService {

    constructor(
        private afs : AngularFirestore,
    ){}

    getOrder(orderId:string): Observable<Order>{
        if (this.checkOrder(orderId)) {
            return this.afs.doc<Order>(`orders/${orderId}`).valueChanges();
          } 
        else {
            return of(null);
        }
    }

    checkOrder(orderId:string): Observable<boolean>{
        return from(this.afs.doc(`orders/${orderId}`).ref.get()
        .then(data => {
            if (data.exists) {
            return true;
            } else {
            console.log('order not found');
            return false;
            }
        }));
    }

    getOrdersByCustomer(customerId:string): Observable<Order[]>{
        const ordersCollection = this.afs.collection<Order>('orders',ref=> ref.where('customerId','==', customerId));
        return ordersCollection.valueChanges();
    }

    addOrder(order: Order): void {
        this.afs.collection(`orders`)
          .add(order)
          .then(data => {
            this.afs.doc(`orders/${data.id}`).update({ orderId: data.id }).then(() => {
              console.log(`id added to order`);
            })
            console.log('order added!');
          }).catch(err => {
            console.log('error', err);
          });
    }

    queryOrderAccountant(orderStatus:string): Observable<Order[]>{
      const ordersCollection = this.afs.collection<Order>('orders',ref=> ref.where('orderStatus','==', orderStatus));
      return ordersCollection.valueChanges();
    }

    loadAllOrders(): Observable<Order[]>{
      return this.afs.collection<Order>(`orders`).valueChanges();
    }
}