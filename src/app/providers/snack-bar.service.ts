import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar: MatSnackBar,
    ) { }

  openFailSnackBar(m:string):void {
    this._snackBar.open(m, 'Close',{
      panelClass : 'snack-error'
    });
  }
  openSuccessSnackBar(m:string):void{
    //console.log('open succ');
    this._snackBar.open(m, 'Close',{
      panelClass : 'snack-success',
      duration: 5*1000,
    });
  }
  closeSnackBar():void{
    this._snackBar.dismiss();
  }
}
