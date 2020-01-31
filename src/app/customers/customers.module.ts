import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomersComponent
      }
    ])
  ]
})
export class CustomersModule { }
