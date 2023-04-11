import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
  ]
})
export class SelectModule { }
