import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "@app/shared/controls/indicators/spinner/spinner.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [SpinnerComponent],
})
export class SpinnerModule { }
