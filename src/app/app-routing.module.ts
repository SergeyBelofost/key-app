import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TextAuthenticationComponent } from './text-authentication/text-authentication.component';
import { PasswordAuthenticationComponent } from './password-authentication/password-authentication.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';


const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'text', component: TextAuthenticationComponent},
  { path: 'password', component: PasswordAuthenticationComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(routes)],
  declarations: [ ],
  exports: [ RouterModule ],
  bootstrap:    [ HomeComponent ]
})
export class AppRoutingModule { }
