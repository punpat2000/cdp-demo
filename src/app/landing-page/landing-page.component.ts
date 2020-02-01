import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../providers/auth.service';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit,OnDestroy {

  public user: User;
  public role:string;
  public customer: Customer;
  public showSpinner:boolean = false;
  public loadFailed:boolean = false;
  public displayName:string;

  constructor(
    private authService : AuthService,
  ) {
    this.loadData();
  }

  loadData(){
    this.showSpinner = true;
    this.authService.getUserData()
    .pipe(takeUntilNgDestroy(this))
    .subscribe(user=>{
      this.user = user;
      if(this.user.role.unspecified === true) this.role = null;
      else if(this.user.role.admin === true) this.role = "admin";
      else if(this.user.role.accountant === true) this.role = "accountant";
      else if(this.user.role.sales === true) this.role = "sales";
      else if(this.user.role.editor === true) this.role = "editor";
      
      this.showSpinner = false;
    });
    setTimeout(()=>{
      if(this.loadFailed === false && this.showSpinner === true){
        this.showSpinner = false;
        this.loadFailed = true;
      }
    },15000);
  }

  updateDisplayName(){
    this.authService.updateDisplayName(this.displayName);
  }

  ngOnDestroy(){}
  ngOnInit() {
  }

}
