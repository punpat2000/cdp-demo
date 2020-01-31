import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderInputComponent } from './order-input.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

import {MatIconModule} from '@angular/material/icon'; 
import { MatSelectModule } from '@angular/material/select'




@NgModule({
  declarations: [OrderInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderInputComponent
      }
    ])
  ]
})
export class OrderInputModule { }
