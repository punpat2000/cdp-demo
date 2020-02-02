import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent } from './customer-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CustomerInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerInfoComponent
      }
    ])
  ]
})
export class CustomerInfoModule { }
