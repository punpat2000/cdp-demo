import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerInputComponent } from './customer-input/customer-input.component';
import { CustomersComponent } from './customers/customers.component';
import { OrderInputComponent } from './order-input/order-input.component';
import { OrdersComponent } from './orders/orders.component';
import { TourInputComponent } from './tour-input/tour-input.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customer-input', component: CustomerInputComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'order-input', component: OrderInputComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'tour-input', component: TourInputComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
