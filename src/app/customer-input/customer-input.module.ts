import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerInputComponent } from './customer-input.component';



@NgModule({
  declarations: [CustomerInputComponent],
  imports: [
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
