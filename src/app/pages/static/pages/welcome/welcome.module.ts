import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from "@app/pages/static/pages/welcome/welcome.component";
import {WelcomeRoutingModule} from "@app/pages/static/pages/welcome/welcome-routing.module";



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
