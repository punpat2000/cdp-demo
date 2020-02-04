import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Tour} from '../models/tour.model';
import {TourService} from '../providers/tour.service';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Component({
  selector: 'app-tour-input',
  templateUrl: './tour-input.component.html',
  styleUrls: ['./tour-input.component.scss']
})
export class TourInputComponent implements OnInit, OnDestroy {


  public tourForm: FormGroup;
  public tourExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourService,
  ) { }

  ngOnInit() {
    this.tourForm = this.formBuilder.group({
      tourId: ['', Validators.required],
      tourName: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.tourService.getAddTourEvent().pipe(takeUntilNgDestroy(this))
    .subscribe(event=>{
      if(event === "tourExists"){
        this.tourExists = true;
      }
    });
  }
  ngOnDestroy(){}
  checkTourId():boolean{
    return (!this.tourForm.controls.tourId.valid
      && (this.tourForm.controls.tourId.dirty
        || this.tourForm.controls.tourId.touched));
  }
  checkTourName():boolean{
    return (!this.tourForm.controls.tourName.valid
      && (this.tourForm.controls.tourName.dirty
        || this.tourForm.controls.tourName.touched));
  }
  checkPrice():boolean{
    return (!this.tourForm.controls.price.valid
      && (this.tourForm.controls.price.dirty
        || this.tourForm.controls.price.touched));
  }
  submit():void{
    if (this.tourForm.valid) {
      const tour : Tour ={
        tourId : this.tourForm.get('tourId').value,
        tourName : this.tourForm.get('tourName').value,
        price : this.tourForm.get('price').value,
      }
      this.tourService.addTour(tour);
    } else {
      console.log(`invalid tour!`);
    }
  }

}
