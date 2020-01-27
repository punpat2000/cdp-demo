import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourInputComponent } from './tour-input.component';



@NgModule({
  declarations: [TourInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TourInputComponent
      }
    ])
  ]
})
export class TourInputModule { }
