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

    bankTransferReceiptFull:file,
    bankTransferReceiptFullConfirmed:boolean,

    bankTransferReceiptEarnest:file,
    bankTransferReceiptEarnestConfirmed:boolean,

    invoice:file,
    invoiceConfirmed:boolean,

    receipt:file,
    receiptConfirmed:boolean,
}

export interface TravelPeriod{
    startDate: Date,
    endDate: Date
}

export interface file{
    downloadURL: string,
    path: string
}