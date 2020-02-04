import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomersComponent
      }
    ])
  ]
})
export class CustomersModule { }
