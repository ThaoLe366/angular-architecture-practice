import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginRoutingModule} from "@app/pages/auth/pages/login/login.routing.module";
import {ButtonsModule, FormFieldModule, InputModule, PasswordModule, SpinnerModule} from "@app/shared";
import {LoginComponent} from "@app/pages/auth/pages/login/login.component";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
    ButtonsModule,
    SpinnerModule,
  ]
})
export class LoginModule { }
