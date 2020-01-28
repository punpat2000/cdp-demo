import { Customer } from './customer.model';
import { Observable } from 'rxjs';

export interface CustomerServiceModel {
    updateCustomer(cus: Customer): void,
    addCustomer(cus: Customer): void,
    getCustomer(customerId: string): Observable<Customer>,
    checkCustomer(id: string): Observable<boolean>,
}