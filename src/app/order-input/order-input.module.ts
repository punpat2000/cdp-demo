import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderInputComponent } from './order-input.component';



@NgModule({
  declarations: [OrderInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderInputComponent
      }
    ])
  ]
})
export class OrderInputModule { }
