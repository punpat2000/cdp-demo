import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataShareService {

    private customerIdSource = new BehaviorSubject('no data');
    currentCustomerId = this.customerIdSource.asObservable();

    constructor(){}

    changeCustomerId(customerId:string){
        this.customerIdSource.next(customerId);
    }

}