export interface Customer {
    customerId?: string,
    firstName: string
    lastName: string,
    gender: string,
    phoneNumber: string,
    birthDate: Date,
    currentAddress: {
        province: string,
        address: string,
        postalCode: string
    },
    email: string,
    referral: string,
    salesId: string,
    order: Array<string>,
    recordedDate: Date,
}