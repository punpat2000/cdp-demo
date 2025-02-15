import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByAccountantComponent } from './order-by-accountant.component';
import { RouterModule } from '@angular/router';
import { DropzoneDirective } from '../file-upload/drop-zone.directive';
import { UploadTaskComponent } from 'src/app/accountant/file-upload/upload-task/upload-task.component';
import { UploaderComponent } from 'src/app/accountant/file-upload/uploader/uploader.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    OrderByAccountantComponent, DropzoneDirective, UploadTaskComponent, UploaderComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderByAccountantComponent
      }
    ])
  ]
})
export class OrderByAccountantModule { }
