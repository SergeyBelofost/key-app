import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextAuthenticationComponent } from './text-authentication/text-authentication.component';
import { PasswordAuthenticationComponent } from './password-authentication/password-authentication.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        TextAuthenticationComponent,
        PasswordAuthenticationComponent,
        HomeComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        TextFieldModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
