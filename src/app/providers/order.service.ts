import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of, Subject } from 'rxjs';
import { Order } from '../models/order.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private orderServiceEventEmitter: Subject<string> = new Subject<string>();

  constructor(
    private afs: AngularFirestore,
  ) { }

  getOrderServiceEventEmitter():Observable<string>{
    return this.orderServiceEventEmitter.asObservable();
  }

  getOrder(orderId: string): Observable<Order> {
    if (this.checkOrder(orderId)) {
      return this.afs.doc<Order>(`orders/${orderId}`).valueChanges();
    }
    else {
      return of(null);
    }
  }

  checkOrder(orderId: string): Observable<boolean> {
    return from(this.afs.doc(`orders/${orderId}`).ref.get()
      .then(data => {
        if (data.exists) {
          this.orderServiceEventEmitter.next('orderExists');
          return true;
        } else {
          this.orderServiceEventEmitter.next('orderNotFound');
          console.log('order not found');
          return false;
        }
      }));
  }

  getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const ordersCollection = this.afs.collection<Order>('orders', ref => ref.where('customerId', '==', customerId));
    return ordersCollection.valueChanges();
  }

  addOrder(order: Order): void {
    this.afs.collection(`orders`)
      .add(order)
      .then(data => {
        this.afs.doc(`orders/${data.id}`).update({ orderId: data.id }).then(() => {
          console.log(`id added to order`);
        });
        this.orderServiceEventEmitter.next('addOrderSuccess');
        console.log('order added!');
      }).catch(err => {
        this.orderServiceEventEmitter.next('addOrderFailed');
        console.log('error', err);
      });
  }

  queryOrderInvoice(): Observable<Order[]> {
    const ordersCollection = this.afs.collection<Order>('orders', ref => ref
      .where('orderStatus', '==', 'waitingForInvoice')
    );
    return ordersCollection.valueChanges();
  }

  queryOrderFullBankTransfer(): Observable<Order[]> {
    const ordersCollection = this.afs.collection<Order>('orders', ref => ref
      .where('orderStatus', '==', 'waitingForFullPayment')
      .where('payment.bankTransferReceiptFullConfirmed', '==', false)
    );
    return ordersCollection.valueChanges();
  }

  queryOrderEarnestBankTransfer(): Observable<Order[]> {
    const ordersCollection = this.afs.collection<Order>('orders', ref => ref
      .where('orderStatus', '==', 'waitingForEarnestPayment')
      .where('payment.bankTransferReceiptEarnestConfirmed', '==', false)
    );
    return ordersCollection.valueChanges();
  }

  queryOrderReceipt(): Observable<Order[]> {
    const ordersCollection = this.afs.collection<Order>('orders', ref => ref
      .where('orderStatus', '==', 'waitingForReceipt')
    );
    return ordersCollection.valueChanges();
  }



  loadAllOrders(): Observable<Order[]> {
    return this.afs.collection<Order>(`orders`).valueChanges();
  }

  updateOrder(orderId: string, field: any) {
    this.afs.collection('orders').doc(orderId).update(field).then(() => {
      this.orderServiceEventEmitter.next('updateOrderSuccess');
      console.log('order updated');
    }, err => {
      this.orderServiceEventEmitter.next('updateOrderFailed');
      console.log('error', err);
    });
  }

  confirmInvoice(orderId: string) {
    this.afs.collection('orders').doc<Order>(orderId).valueChanges().pipe(take(1)).subscribe(order => {
      if (order) {
        const updateField = {};
        if (order.payment.payEarnest === true) {
          updateField['payment.invoiceConfirmed'] = true;
          updateField['orderStatus'] = 'waitingForEarnestPayment';
        } else {
          updateField['payment.invoiceConfirmed'] = true;
          updateField['orderStatus'] = 'waitingForFullPayment';
        }
        this.afs.collection('orders').doc(orderId).update(
          updateField
        ).then(() => {
          this.orderServiceEventEmitter.next('invoiceConfirmed');
          console.log("invoice confirmed");
        }, err => {
          this.orderServiceEventEmitter.next('invoiceConfirmFailed');
          console.log("error", err);
        });
      }
    });
  }

  confirmEarnestReceipt(orderId: string) {
    const updateField = {
      'payment.bankTransferReceiptEarnestConfirmed': true,
      'payment.paidEarnest': true,
      'orderStatus': 'waitingForFullPayment',
    }
    this.afs.collection('orders').doc(orderId).update(updateField).then(() => {
      this.orderServiceEventEmitter.next('earnestConfirmed');
      console.log("Earnest receipt confirmed");
    }, err => {
      this.orderServiceEventEmitter.next('earnestConfirmFailed');
      console.log("error", err);
    });
  }

  confirmReceipt(orderId: string) {
    const updateField = {
      'payment.receiptConfirmed': true,
      'orderStatus': 'orderCompleted'
    }
    this.afs.collection('orders').doc(orderId).update(updateField).then(() => {
      this.orderServiceEventEmitter.next('receiptConfirmed');
      console.log("receipt confirmed");
    }, err => {
      this.orderServiceEventEmitter.next('receiptConfirmFailed');
      console.log("error", err);
    });
  }

  confirmFullReceipt(orderId:string){
    const updateField = {
      'payment.bankTransferReceiptFullConfirmed': true,
      'payment.paidFull': true,
      'orderStatus': 'waitingForReceipt',
    }
    this.afs.collection('orders').doc(orderId).update(updateField).then(() => {
      this.orderServiceEventEmitter.next('fullConfirmed');
      console.log("Full receipt confirmed");
    }, err => {
      this.orderServiceEventEmitter.next('fullConfirmedFailed');
      console.log("error", err);
    });
  }
}
