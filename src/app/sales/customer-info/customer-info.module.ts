import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info.component';
import { RouterModule } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CustomerInfoComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerInfoComponent
      }
    ])
  ]
})
export class CustomerInfoModule { }
