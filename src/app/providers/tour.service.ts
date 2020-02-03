import { Injectable } from '@angular/core';
import { Tour } from '../models/tour.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addTour(t: Tour): void {
    this.afs.collection(`tours`).doc(t.tourId)
      .set(t)
      .then(()=>{
        console.log('tour added!');
      }).catch(err => {
        console.log('error', err);
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
          console.log('tour found');
          return true;
        } else {
          console.log('tour not found');
          return false;
        }
      }));
  }
}
