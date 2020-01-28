export interface Customer {
    customerId?: string,
    firstName: string
    lastName: string,
    gender: string,
    phoneNumber: string,
    birthDate: Date,
    currentAddress: {
        address: string,
        province: string,
        postalCode: string
    },
    email: string,
    referral: string,
    salesId: string,
    order: Array<string>,
    recordedDate: Date,
}