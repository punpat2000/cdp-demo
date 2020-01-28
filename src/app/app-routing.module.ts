import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
