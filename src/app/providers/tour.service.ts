import { Injectable } from '@angular/core';
import { Tour } from '../models/tour.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private tourServiceEventEmitter: Subject<string> = new Subject<string>();

  constructor(
    private afs: AngularFirestore
  ) { }

  getAddTourEvent(): Observable<string>{
    return this.tourServiceEventEmitter.asObservable();
  }

  addTour(t: Tour): void {
    this.afs.collection('tours').doc(t.tourId).ref.get().then(data => {
      if (!data.exists) {
        this.tourServiceEventEmitter.next('tourDNE');
        this.afs.collection(`tours`).doc(t.tourId)
          .set(t)
          .then(() => {
            console.log('tour added!');
            this.tourServiceEventEmitter.next('addTourSuccess');
          }).catch(err => {
            console.log('error', err);
            this.tourServiceEventEmitter.next('addTourFailed');
          });
      }else{
        this.tourServiceEventEmitter.next('tourExists');
      }
    });
  }
  getTour(id: string): Observable<Tour> {
    if (this.checkTour(id)) {
      return this.afs.doc<Tour>(`tours/${id}`).valueChanges();
    } else {
      return of(null);
    }
  }

  checkTour(id: string): Observable<boolean> {
    return from(this.afs.doc(`tours/${id}`).ref.get()
      .then(data => {
        if (data.exists) {
          this.tourServiceEventEmitter.next('tourFound');
          console.log('tour found');
          return true;
        } else {
          this.tourServiceEventEmitter.next('tourNotFound');
          console.log('tour not found');
          return false;
        }
      }));
  }
}
