import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthorizationGuard } from './guard/authorization.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales','accountant']
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin']
     }
  },
  {
    path: 'accountant/orders',
    loadChildren: () => import('./accountant/order-by-accountant/order-by-accountant.module').then(m => m.OrderByAccountantModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','accountant']
     }
  },
  { 
    path: 'customer-input',
    loadChildren: () => import('./customer-input/customer-input.module').then(m => m.CustomerInputModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  },
  { 
    path: 'customers',
    loadChildren: () => import('./sales/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  },
  { 
    path: 'customers/customer-info',
    loadChildren: () => import('./sales/customer-info/customer-info.module').then(m => m.CustomerInfoModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  },
  { 
    path: 'customers/order-input', 
    loadChildren: () => import('./order-input/order-input.module').then(m => m.OrderInputModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  },
  { 
    path: 'customers/orders',
    loadChildren: () => import('./order-by-sales/orders-by-sales.module').then(m => m.OrdersModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  },
  { 
    path: 'tour-input',
    loadChildren: () => import('./tour-input/tour-input.module').then(m => m.TourInputModule),
    canActivate: [AngularFireAuthGuard, AuthorizationGuard],
    data: { 
      authGuardPipe: redirectUnauthorizedToLogin,
      allowedRoles: ['editor','admin','sales']
     }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
