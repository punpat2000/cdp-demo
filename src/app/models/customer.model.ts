export interface Customer {
    customerId?: string,
    firstName: string
    lastName: string,
    gender: string,
    phoneNumber: string,
    age: number,
    currentAddress: {
        address: string,
        province: string,
        postalCode: string
    },
    email: string,
    referral: string,
    salesID: string,
    order: Array<string>,
    recordedDate: Date,
}