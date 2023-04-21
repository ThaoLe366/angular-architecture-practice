import {Action, createAction, props} from "@ngrx/store";
import {Dictionaries} from "@app/store/dictionaries/dictionaries.models";
import {DictionariesState} from "@app/store/dictionaries/dictionaries.reducer";

export enum Types {
  READ = '[Dictionaries] Read: Start',
  READ_SUCCESS = '[Dictionaries] Read: Success',
  READ_ERROR = '[Dictionaries] Read: Error'
}
export class Read implements Action {
  readonly type = Types.READ;
  constructor() {
  }
}
export class ReadSuccess implements Action {
  readonly type = Types.READ_SUCCESS;
  constructor(public dictionaries: Dictionaries) {
  }
}

export class ReadError implements Action {
  readonly type = Types.READ_ERROR;
  constructor(public error: string) {
  }
}
export const readState = createAction(Types.READ);
export const readSuccessState = createAction(Types.READ_SUCCESS,  props<{dictionaries: Dictionaries}>());
export const readErrorState = createAction(Types.READ_ERROR, props<{message: string}>())
export type All = Read | ReadError | ReadSuccess;
