import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrderInputComponent } from './order-input/order-input.component';
import { OrdersComponent } from './orders/orders.component';
import { TourInputComponent } from './tour-input/tour-input.component';
import { HomeComponent } from './home/home.component';
import { CustomerInputComponent } from './customer-input/customer-input.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'customer-input',
    loadChildren: () => import('./customer-input/customer-input.module').then(m => m.CustomerInputModule)
  },
  { 
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  { 
    path: 'order-input', 
    loadChildren: () => import('./order-input/order-input.module').then(m => m.OrderInputModule)
  },
  { 
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)  
  },
  { 
    path: 'tour-input',
    loadChildren: () => import('./tour-input/tour-input.module').then(m => m.TourInputModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
