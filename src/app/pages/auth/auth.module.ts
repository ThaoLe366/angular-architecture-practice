import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailConfirmComponent } from './pages/email-confirm/email-confirm.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import {AuthRoutingModule} from "@app/pages/auth/auth-routing.module";



@NgModule({
  declarations: [
    // EmailConfirmComponent,
    // LoginComponent,
    // RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
