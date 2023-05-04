import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiterComponent } from './components/professional/roles/recruiter/recruiter.component';
import { ExperiencesComponent } from './components/professional/roles/employee/experiences/experiences.component';
import {
  ButtonModule,
  CheckboxesModule,
  DateRangeModule,
  FormFieldModule,
  InputModule,
  RadiosModule,
  SelectModule, SpinnerModule
} from "@app/shared";
import {ReactiveFormsModule} from "@angular/forms";
import {
  EmployeeComponent
} from "@app/pages/profile/pages/form/components/professional/roles/employee/employee.component";
import {FormComponent} from "./form.component";

import {PersonalComponent} from "@app/pages/profile/pages/form/components/personal/personal.component";
import {ProfessionalComponent} from "@app/pages/profile/pages/form/components/professional/professional.component";
import {FormRoutingModule} from "@app/pages/profile/pages/form/form-routing.module";
import {AutocompleteModule} from "@app/shared/controls/autocomplete/autocomplete.module";
import {FilesUploadModule} from "@app/shared/popups";
import {UserPhotoModule} from "@app/shared/layout";
import {StepperModule} from "@app/pages/profile/pages/form/components/stepper/stepper.module";
import {MapperService} from "@app/pages/profile/pages/form/services/mapper/mapper.service";



@NgModule({
    declarations: [
        EmployeeComponent,
        RecruiterComponent,
        ExperiencesComponent,
        FormComponent,
        PersonalComponent,
        ProfessionalComponent,

    ],
    imports: [
        CommonModule,
        FormRoutingModule,
        FormFieldModule,
        InputModule,
        ReactiveFormsModule,
        ButtonModule,
        DateRangeModule,
        AutocompleteModule,
        SelectModule,
        CheckboxesModule,
        RadiosModule,
        FilesUploadModule,
        SpinnerModule,
        UserPhotoModule,
        ButtonModule,
        StepperModule
    ],
    providers: [MapperService],

    exports: [
        EmployeeComponent,
        RecruiterComponent
    ]
})
export class FormModule { }
