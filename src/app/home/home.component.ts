import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  goToCustomerInput(){
    this.router.navigate(['/customer-input']);
  }
  goToCustomerList(){
    this.router.navigate(['/customers']);
  }
  goToOrderInput(){
    this.router.navigate(['/order-input']);
  }
  goToOrders(){
    this.router.navigate(['/orders']);
  }
  goToTourInput(){
    this.router.navigate(['/tour-input']);
  }
  goToLandingPage(){
    this.router.navigate(['/landing-page']);
  }
}
