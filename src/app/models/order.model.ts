export interface Order{
    orderId?: string,
    customerId: string,
    tourId: string,
    salesId: string,
    referral: string,
    personCount: number,
    payment: Payment,
    travelPeriod: TravelPeriod,
    netPrice: number,
    orderDate: Date,
    dateCompleted: Date,
    isCompleted: boolean
}

export interface Payment{
    earnestPaymentDate?: Date,
    fullPaymentDate: Date,
    paidEarnest?:boolean,
    paidFull:boolean
}

export interface TravelPeriod{
    startDate: Date,
    endDate: Date
}