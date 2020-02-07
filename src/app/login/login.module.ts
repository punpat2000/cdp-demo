import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FirebaseUIModule } from 'firebaseui-angular';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar'



@NgModule({
  declarations: [LoginComponent],
  imports: [
    FirebaseUIModule,
    MatProgressBarModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent
      }
    ])
  ]
})
export class LoginModule { }
