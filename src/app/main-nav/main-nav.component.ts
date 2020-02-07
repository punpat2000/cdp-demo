import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';
import { AuthService } from '../providers/auth.service';
import { UserRoles, User } from '../models/user.model';
import { LoadingService } from '../providers/loading.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnDestroy, OnInit {

  public isloggedIn:boolean = false;
  public role:UserRoles;
  public user:User;
  public $load : Observable<boolean>;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private ldService: LoadingService,
    ) {}

    ngOnInit(){
      this.afAuth.authState.pipe(takeUntilNgDestroy(this))
      .subscribe(data=>{
        if(data){
          this.isloggedIn = true;
        }else this.isloggedIn = false;
        console.log(this.isloggedIn);
      });
      this.authService.getUserData().pipe(takeUntilNgDestroy(this)).subscribe(user=>{
        if(user){
          this.user = user;
          this.role = user.role;
        }
      });
      this.$load = this.ldService.eventEmitter()
    }

    goTo(page:string){
      this.router.navigate([page]);
    }
    logOut(){
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
      this.user = null;
      //location.reload();
    }
    ngOnDestroy(){}
}
