import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { CustomersModule } from './customers/customers.module';
import { OrderInputModule } from './order-input/order-input.module';
import { HomeModule } from './home/home.module';
import { OrdersModule } from './orders/orders.module';
import { TourInputModule } from './tour-input/tour-input.module';
import { CustomerInputModule } from './customer-input/customer-input.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    TourInputModule,
    HomeModule,
    CustomerInputModule,
    OrderInputModule,
    OrdersModule,
    CustomersModule,
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
