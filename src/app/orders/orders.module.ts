import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent
      }
    ])
  ]
})
export class OrdersModule { }
