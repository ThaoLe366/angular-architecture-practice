import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from "@app/pages/auth/pages/registration/registration.component";
import {RegistrationRoutingModule} from "@app/pages/auth/pages/registration/registration.routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule, FormFieldModule, InputModule, PasswordModule, SpinnerModule} from "@app/shared";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,
    InputModule,
    PasswordModule,
    SpinnerModule,
    RouterModule,
  ]
})
export class RegistrationModule { }
