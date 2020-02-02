import { Customer } from './customer.model';

export interface Order{
    orderId?: string,
    customerId: string,
    customer: Customer,
    tourId: string,
    salesId: string,
    referral: string,
    personCount: number,
    payment: Payment,
    travelPeriod: TravelPeriod,
    netPrice: number,
    orderDate: Date,
    dateCompleted: Date,
    orderStatus: 'waitingForInvoice' | 'waitingForEarnestPayment' | 'waitingForFullPayment' | 'waitingForReceipt' | 'orderCompleted'
}

export interface Payment{
    payEarnest:boolean,
    earnestPaymentDate: Date,
    fullPaymentDate: Date,
    paidEarnest:boolean,
    paidFull:boolean,
    bankTransferReceiptFull:string,
    bankTransferReceiptEarnest:string,
    invoice:string,
    receipt:string,
}

export interface TravelPeriod{
    startDate: Date,
    endDate: Date
}