import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../providers/auth.service';
import { UserRoles } from '../models/user.model';
import { take } from 'rxjs/operators';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { Router } from '@angular/router';
import { LoadingService } from '../providers/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public $load:Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private ldService : LoadingService,
    ) { }
    public userCreated:boolean=false;
    public showSpinner:boolean=false;

  ngOnInit() {
    this.$load = this.ldService.eventEmitter();
    this.authService.getEmitter().pipe(takeUntilNgDestroy(this)).subscribe(event=>{
      if(event=='created'){
        console.log('here');
        this.userCreated = true;
        this.showSpinner = false;
        this.ldService.next(false);
        //this.router.navigate(['home']);
      } 
    });
  }
  ngOnDestroy(){
  }

  signIn(): void {
    this.showSpinner = true;
    this.ldService.next(true);
    this.afAuth.auth.signInAnonymously().then(()=>{
      location.reload();
    }).catch(error => {
      console.log(error ? error : null);
    })
  }
  chooseRole(role: string): void {
    this.authService.getUserData().pipe(take(1)).subscribe(user => {
      let userUpdated = user;
      let roleUpdated: UserRoles;
      if (role === "acc") {
        roleUpdated = {
          admin: false,
          editor: false,
          sales: false,
          accountant: true,
          unspecified: false
        }
      } else if (role === "editor") {
        roleUpdated = {
          admin: false,
          editor: true,
          sales: false,
          accountant: false,
          unspecified: false
        }
      } else if (role === "sales") {
        roleUpdated = {
          admin: false,
          editor: false,
          sales: true,
          accountant: false,
          unspecified: false
        }
      }
      userUpdated['role'] = roleUpdated;
      console.log(userUpdated);
      this.authService.updateUserData(userUpdated);
    });
  }
}
