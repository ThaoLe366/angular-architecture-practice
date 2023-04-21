import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundComponent} from "@app/pages/static/pages/not-found/not-found.component";
import {NotFoundRoutingModule} from "@app/pages/static/pages/not-found/not-found-routing.module";



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
