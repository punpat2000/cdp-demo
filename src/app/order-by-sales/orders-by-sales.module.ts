import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersBySalesComponent } from './orders-by-sales.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [OrdersBySalesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
    MatMenuModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersBySalesComponent
      }
    ])
  ]
})
export class OrdersModule { }
