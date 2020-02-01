export interface Order{
    orderId?: string,
    customerId: string,
    tourId: string,
    salesId: string,
    referral: string,
    personCount: number,
    payment: Payment,
    travelPeriod: string,
    netPrice: number,
    orderDate: Date
}

export interface Payment{
    earnestPaymentDate?: Date,
    fullPaymentDate: Date,
    paidEarnest?:boolean
    paidFull:boolean
}