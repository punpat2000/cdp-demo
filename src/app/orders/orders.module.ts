import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator'; 




@NgModule({
  declarations: [OrdersComponent],
  imports: [
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersComponent
      }
    ])
  ]
})
export class OrdersModule { }
