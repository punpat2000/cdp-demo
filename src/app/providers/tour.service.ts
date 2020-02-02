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
    return;
  }
}
