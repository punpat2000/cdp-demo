import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _event : Subject<boolean> = new Subject<boolean>();
  public $loadEvent : Observable<boolean> = this._event.asObservable();

  constructor(
    
  ) { }

  eventEmitter(){
    return this._event.asObservable();
  }

  next(event:boolean){
    this._event.next(event);
  }
}
