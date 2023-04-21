
import * as fromDictionaries from './dictionaries';
import * as fromUser from './user';
import {Action, ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from "@angular/core";
import {DictionariesState} from "./dictionaries";

export interface State {
  dictionaries: fromDictionaries.DictionariesState;
  user: fromUser.UserState;
}
// export interface State {
//   router: fromRouter.RouterReducerState<any>;
// }

// @ts-ignore
export const reducers: ActionReducerMap<State> = {
  dictionaries: fromDictionaries.dictionariesReducer,
  user: fromUser.userReducer
}
// @ts-ignore
// export const ROOT_REDUCERS = new InjectionToken<
//   ActionReducerMap<State | undefined, Action>
//   >("Root reducers token", {
//   factory: () => ({
//     dictionaries: fromDictionaries?.reducer ,
//     user: fromUser.reducer,
//   })
// });
export const effects = [
  fromDictionaries.DictionariesEffects,
  fromUser.UserEffect,
]

