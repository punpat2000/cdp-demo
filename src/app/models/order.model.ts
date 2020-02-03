import { Customer } from './customer.model';
import { Tour } from './tour.model';
import { User } from './user.model';

export interface Order {
    orderId?: string,
    customerId: string,
    customer: Customer,
    tourId: string,
    tour: Tour,
    salesId: string,
    sales: User,
    referral: string,
    personCount: number,
    payment: Payment,
    travelPeriod: TravelPeriod,
    netPrice: number,
    orderDate: Date,
    dateCompleted: Date,
    orderStatus: 'waitingForInvoice' | 'waitingForEarnestPayment' | 'waitingForFullPayment' | 'waitingForReceipt' | 'orderCompleted'
}

export interface Payment {
    payEarnest: boolean,
    earnestPaymentDate: Date,
    fullPaymentDate: Date,
    paidEarnest: boolean,
    paidFull: boolean,
    bankTransferReceiptFull: string,
    bankTransferReceiptEarnest: string,
    invoice: string,
    receipt: string,
}

export interface TravelPeriod {
    startDate: Date,
    endDate: Date
}