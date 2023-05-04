import {User} from "@app/models/backend";
import {createReducer, on} from "@ngrx/store";
import * as fromActions from './user.action';

export interface UserState {
  entity: User;
  loading: boolean;
  error: string;
}

const initialState: UserState ={
  entity: null,
    loading: null,
    error: null,
}

export const userFormReducer = createReducer(initialState,
  on(fromActions.readUserState, (state) => ({...state, loading: true, error: null}) ),
  on(fromActions.readUserSuccess, (state, { user }) => ({ ...state, entity: user, loading: false})),
  on(fromActions.readUserError, (state, { error }) => ({ ...state, entity: null, loading: false, error: error})),
  on(fromActions.clearUserState, (state) => ({...state}))
)
