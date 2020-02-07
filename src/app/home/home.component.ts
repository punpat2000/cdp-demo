import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../providers/auth.service';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { UserRoles } from '../models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.authService.getUserData().pipe(takeUntilNgDestroy(this)).subscribe(user=>{
      if(user.role.unspecified){
        console.log('here');
        this.router.navigate(['landing-page']);
      }
    })
  }
  ngOnDestroy(){}
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
      userUpdated.role = roleUpdated;
      console.log(userUpdated);
      this.authService.updateUserData(userUpdated);
    });
  }
}
