import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisplayComponent} from "./display.component";
import {EmployeeComponent} from "./employee/employee.component";
import {RecruiterComponent} from "./recruiter/recruiter.component";
import {DisplayRoutingModule} from "./display-routing.module";
import {UserPhotoModule} from "@app/shared/layout";


@NgModule({
    declarations: [
        DisplayComponent,
        EmployeeComponent,
        RecruiterComponent,
    ],
  // exports: [
  //   RecruiterComponent,
  //   EmployeeComponent
  // ],
    imports: [
        CommonModule,
        DisplayRoutingModule,
        UserPhotoModule,
        // AppModule
    ]
})
export class DisplayModule { }
