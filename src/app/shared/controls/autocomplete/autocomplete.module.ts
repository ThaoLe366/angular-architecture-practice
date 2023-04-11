import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HighLightPipe} from "@app/shared/controls/autocomplete/pipes/highlight.pipe";



@NgModule({
  declarations: [
    AutocompleteComponent, HighLightPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ], exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
