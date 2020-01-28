import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerInputComponent } from './customer-input.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomerInputComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerInputComponent
      }
    ])
  ]
})
export class CustomerInputModule { }
