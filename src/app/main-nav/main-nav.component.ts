import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { AuthService } from '../providers/auth.service';
import { UserRoles } from '../models/user.model';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnDestroy {

  public isloggedIn:boolean = false;
  public role:UserRoles;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
    ) {
      this.afAuth.authState.pipe(takeUntilNgDestroy(this))
      .subscribe(data=>{
        if(data){
          this.isloggedIn = true;
        }else this.isloggedIn = false;
        console.log(this.isloggedIn);
      });
      this.authService.getUserData().pipe(takeUntilNgDestroy(this)).subscribe(user=>{
        this.role = user.role;
      })
    }

    goTo(page:string){
      this.router.navigate([page]);
    }
    logOut(){
      this.afAuth.auth.signOut();
      location.reload();
    }
    ngOnDestroy(){}
}
