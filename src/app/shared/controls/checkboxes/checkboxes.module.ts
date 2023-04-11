import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CheckboxesComponent} from "@app/shared/controls/checkboxes/checkboxes.component";



@NgModule({
  declarations: [CheckboxesComponent],
  imports: [
    CommonModule
  ],
  exports: [CheckboxesComponent]
})
export class CheckboxesModule { }
