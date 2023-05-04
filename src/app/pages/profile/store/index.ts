import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromForm from './form/form.reducer';

import * as fromUser from './user/user.reducer';
import {UserEffects} from "@app/pages/profile/store/user/user.effect";



export interface ProfileState {
  form: fromForm.FormState;
  user: fromUser.UserState;
}


export const reducerUserProfile: ActionReducerMap<ProfileState> = {
  form: fromForm.formProfileReducer,
  user: fromUser.userFormReducer,
}

export const effects = [
  UserEffects
]
export const getProfileState = createFeatureSelector<ProfileState>('profile')
