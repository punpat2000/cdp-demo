export interface Customer {
    firstName: string
    lastName: string,
    gender: string,
    phoneNumber: string,
    age: number,
    currentAddress: {
        province: string,
        address: string,
        postalCode: string
    },
    email: string,
    referral: string,
    salesID: string,
    order: Array<string>,
    recordedDate: Date,
}