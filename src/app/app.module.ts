import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './shared/buttons/button/button.component';
import {MatNativeDateModule} from "@angular/material/core";
import {NotificationModule} from "@app/pages/demo/service";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "@app/environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {effects, reducers} from "@app/store";
import { DisplayComponent } from './pages/profile/display/display.component';
import { EmployeeComponent } from './pages/profile/display/employee/employee.component';
import { RecruiterComponent } from './pages/profile/display/recruiter/recruiter.component';
import { FormComponent } from './pages/profile/form/form.component';
import { PersonalComponent } from './pages/profile/form/personal/personal.component';
import { ProfessionalComponent } from './pages/profile/form/professional/professional.component';
import { StepperComponent } from './pages/profile/form/stepper/stepper.component';
// import { FilesUploadComponent } from './shared/popups/files-upload/files-upload.component';
import {FilesUploadModule} from "@app/shared/popups/files-upload/files-upload.module";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayComponent,
    EmployeeComponent,
    RecruiterComponent,
    FormComponent,
    PersonalComponent,
    ProfessionalComponent,
    StepperComponent,
    // FilesUploadComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatNativeDateModule,

        NotificationModule.forRoot(),

        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            },

        }),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        FilesUploadModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
