import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule } from '@angular/forms';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent
      }
    ])
  ]
})
export class LandingPageModule { }
