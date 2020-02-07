import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component'; 
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ]
})
export class HomeModule { }
