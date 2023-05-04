import {Action, createAction, props} from "@ngrx/store";
import {ProfileForm} from "@app/pages/profile/pages/form/form.component";

export enum Types {
  SET = '[Profile] [Form] Set',
  UPDATE = '[Profile] [Form] Update',
  CLEAR = '[Profile] [Form] Clear'
}

export class Set implements Action {
  readonly type = Types.SET;
  constructor(public form: ProfileForm) { }
}

export class Update implements Action {
  readonly type = Types.UPDATE;
  constructor(public changes: Partial<ProfileForm>) { }
}

export class Clear implements Action {
  readonly type = Types.CLEAR;
  constructor() { }
}
export const setState = createAction(Types.SET, props<{form: ProfileForm}>());
export const updateState = createAction(Types.UPDATE, props<{changes: Partial<ProfileForm>}>());
export const clearState = createAction(Types.CLEAR);
export type All
  = Set
  | Update
  | Clear;
