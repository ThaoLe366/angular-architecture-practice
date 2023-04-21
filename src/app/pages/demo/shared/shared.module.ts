import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedComponent} from "./shared.component";
import {ButtonsModule, ControlsModule, SpinnerModule} from "@app/shared";
import {PopupsModule} from "@app/shared/popups";


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    ButtonsModule,
    ControlsModule,
    SpinnerModule,
    PopupsModule
  ]
})
export class SharedModule { }
