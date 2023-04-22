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
import { DisplayComponent } from './pages/profile/pages/display/display.component';
import { EmployeeComponent } from './pages/profile/pages/display/employee/employee.component';
import { RecruiterComponent } from './pages/profile/pages/display/recruiter/recruiter.component';
import { PersonalComponent } from './pages/profile/pages/form/components/personal/personal.component';
import { ProfessionalComponent } from './pages/profile/pages/form/components/professional/professional.component';
import { StepperComponent } from './pages/profile/pages/form/components/stepper/stepper.component';
// import { FilesUploadComponent } from './shared/popups/files-upload/files-upload.component';
import {FilesUploadModule} from "@app/shared/popups/files-upload/files-upload.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlsModule, FormFieldModule, InputModule} from "@app/shared";
import { UserPhotoComponent } from './shared/layout/user-photo/user-photo.component';
import { FormComponent } from './pages/profile/pages/form/form.component';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayComponent,
    EmployeeComponent,
    RecruiterComponent,
    PersonalComponent,
    ProfessionalComponent,
    StepperComponent,
    UserPhotoComponent,
    FormComponent,
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
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    ControlsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
