import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../providers/auth.service';
import { takeUntilNgDestroy } from 'take-until-ng-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private authService: AuthService
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
}
