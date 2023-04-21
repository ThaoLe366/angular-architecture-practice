import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmailConfirmComponent} from "@app/pages/auth/pages/email-confirm/email-confirm.component";
import {EmailConfirmRoutingModule} from "@app/pages/auth/pages/email-confirm/email-confirm-routing.module";



@NgModule({
  declarations: [EmailConfirmComponent],
  imports: [
    CommonModule,
    EmailConfirmRoutingModule
  ]
})
export class EmailConfirmModule { }
