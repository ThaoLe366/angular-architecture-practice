import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {effects, reducerUserProfile} from "./store";
import {EffectsModule} from "@ngrx/effects";
import {ProfileRoutingModule} from "@app/pages/profile/profile-routing.module";
import {UserResolver} from "@app/pages/profile/resolvers/user.resolver";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('profile', reducerUserProfile),
    EffectsModule.forFeature(effects),
    ProfileRoutingModule,
  ],
  providers: [UserResolver]
})
export class ProfileModule { }
