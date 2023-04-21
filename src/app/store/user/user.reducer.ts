import {User} from "@app/models/backend";
import * as fromActions from './user.actions';
import {createAction, createReducer, on} from "@ngrx/store";

export interface UserState {
  entity: User | null;
  uid: string;
  loading: boolean;
  error: string;
}

// @ts-ignore
const initialState: UserState = {
  entity: {} as User,
  error: '',
  loading: false,
}
export function reducer(state = initialState, action: fromActions.All): UserState {
  switch (action.type) {
    case fromActions.Types.INIT: {
      return { ...state, loading: true };
    }

    case fromActions.Types.INIT_AUTHORIZED: {
      console.log("25, init authorized reducer ");
      return { ...state, entity: action.user, uid: action.uid, loading: false, error: '' };
    }

    case fromActions.Types.INIT_UNAUTHORIZED: {
      return { ...state, entity: null, loading: false, error: '' };
    }

    case fromActions.Types.INIT_ERROR: {
      return { ...state, loading: false, error: action.error };
    }


    // Sign In

    case fromActions.Types.SIGN_IN_EMAIL: {
      return { ...state, loading: true };
    }

    case fromActions.Types.SIGN_IN_EMAIL_SUCCESS: {
      console.log("48 from user reducer ", action);
      return { ...state, entity: action.user, uid: action.uid, loading: false, error: '' };
    }

    case fromActions.Types.SIGN_IN_EMAIL_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    // Sign Up

    case fromActions.Types.SIGN_UP_EMAIL: {
      return { ...state, loading: true };
    }

    case fromActions.Types.SIGN_UP_EMAIL_SUCCESS: {
      return { ...state, uid: action.uid, loading: false };
    }

    case fromActions.Types.SIGN_UP_EMAIL_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    // Sign Out

    case fromActions.Types.SIGN_OUT: {
      return { ...state, loading: true };
    }

    case fromActions.Types.SIGN_OUT_SUCCESS: {
      return { ...initialState };
    }

    case fromActions.Types.SIGN_OUT_ERROR: {
      return { ...state, error: action.error, loading: false };
    }

    default: {
      return state;
    }
  }
}
export const userReducer = createReducer(initialState,
  on(fromActions.initState, state => ({...state, loading: true})),
  on(fromActions.initAuthorizedState, (state, { uid, user}) => ({ ...state, entity: user, uid: uid, loading: false, error: '' })),
  on(fromActions.initUnauthorizedState, (state) => ({  ...state, entity: null, loading: false, error: '' })),
  on(fromActions.initErrorState, (state, { message}) => ({ ...state, loading: false, error: message  })),

  on(fromActions.signInEmailState, state => ({ ...state, loading: true })),
  on(fromActions.signInEmailSuccessState, (state, { uid, user }) => ({ ...state, entity: user, uid: uid, loading: false, error: ''})),
  on(fromActions.signInEmailErrorState, (state, { message}) => ({ ...state, error: message, loading: false})),

  on(fromActions.signUpEmailState, (state) => ({ ...state, loading: true })),
  on(fromActions.signUpEmailSuccessState, (state, { uid }) => ({...state, uid: uid, loading: false})),
  on(fromActions.signUpEmailStateError, (state, { message }) => ({...state, error: message, loading: false })),

  on(fromActions.signOutState, (state) => ({ ...state, loading: true })),
  on(fromActions.signOutSuccessState, (state) => ({...state})),
  on(fromActions.signOutErrorState, (state, { message }) => ({...state, error: message, loading: false })),


)
