import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import * as VIEWs from '../views';
import * as SERVICEs from '../services';
import { MainCardComponent } from '../components/MainCard/mainCard.component';
import { UserCardComponent } from '../components/UserCard/userCard.component';

const ROUTES = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: VIEWs.LoginComponent
  },
  {
    path: 'upload',
    component: VIEWs.UploadImageComponent
  },
  {
    path: 'mainRoom',
    component: VIEWs.MainComponent
  },
  {
    path: '**',
    component: VIEWs.LoginComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    VIEWs.LoginComponent,
    VIEWs.MainComponent,
    VIEWs.UploadImageComponent,
    MainCardComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [
    SERVICEs.SocketConnectionService,
    SERVICEs.HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
