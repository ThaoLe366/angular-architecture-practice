import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordComponent} from "@app/shared/controls/password/password.component";



@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule
  ],
  exports: [PasswordComponent]
})
export class PasswordModule { }
