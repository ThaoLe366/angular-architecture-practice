import {Action, createAction, props} from "@ngrx/store";
import {User} from "@app/models/backend";
import {EmailPasswordCredentials} from "@app/store/user/user.models";

export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN_EMAIL = '[User] Sign In with email: Start',
  SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Success',
  SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

  SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
  SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Success',
  SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

  SIGN_OUT = '[User] Sign Out: Start',
  SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
  SIGN_OUT_ERROR = '[User] Sign Out: Error',
}

export const initState = createAction(Types.INIT);
export const initAuthorizedState = createAction(Types.INIT_AUTHORIZED, props<{uid: string, user: User | null}>());
export const initUnauthorizedState = createAction(Types.INIT_UNAUTHORIZED);
export const initErrorState = createAction(Types.INIT_ERROR, props<{message: string}>());

//
export class Init implements Action {
  readonly type= Types.INIT;
  constructor() {
  }
}
export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public uid: string, public user: User | null) {
  }
}
export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor() {
  }
}
export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string) {
  }
}
export const signInEmailState = createAction(Types.SIGN_IN_EMAIL, props<{credentials: EmailPasswordCredentials}>());
export const signInEmailSuccessState = createAction(Types.SIGN_IN_EMAIL_SUCCESS, props<{uid: string, user: User | null}>());
export const signInEmailErrorState = createAction(Types.SIGN_IN_EMAIL_ERROR, props<{message: string}>());


// Sign in
export class SignInEmail implements Action {
  readonly type = Types.SIGN_IN_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) {
  }
}

export class SignInEmailSuccess implements Action {
  readonly type = Types.SIGN_IN_EMAIL_SUCCESS;
  constructor(public uid: string, public user: User | null) {
  }
}

export class SignInEmailError implements Action {
  readonly type = Types.SIGN_IN_EMAIL_ERROR;
  constructor(public error: string) { }
}
export const signUpEmailState = createAction(Types.SIGN_UP_EMAIL, props<{credentials: EmailPasswordCredentials}>());
export const signUpEmailSuccessState = createAction(Types.SIGN_UP_EMAIL_SUCCESS, props<{uid: string}>());
export const signUpEmailStateError = createAction(Types.SIGN_UP_EMAIL_ERROR, props<{message: string}>());
// Sign Up

export class SignUpEmail implements Action {
  readonly type = Types.SIGN_UP_EMAIL;
  constructor(public credentials: EmailPasswordCredentials) { }
}

export class SignUpEmailSuccess implements Action {
  readonly type = Types.SIGN_UP_EMAIL_SUCCESS;
  constructor(public uid: string) { }
}

export class SignUpEmailError implements Action {
  readonly type = Types.SIGN_UP_EMAIL_ERROR;
  constructor(public error: string) { }
}

export const signOutState = createAction(Types.SIGN_OUT);
export const signOutSuccessState = createAction(Types.SIGN_OUT_SUCCESS);
export const signOutErrorState = createAction(Types.SIGN_OUT_ERROR, props<{message: string}>());
// Sign Out

export class SignOut implements Action {
  readonly type = Types.SIGN_OUT;
  constructor() { }
}

export class SignOutSuccess implements Action {
  readonly type = Types.SIGN_OUT_SUCCESS;
  constructor() { }
}

export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_ERROR;
  constructor(public error: string) { }
}
export type All
  = Init
  | InitAuthorized
  | InitUnauthorized
  | InitError
  | SignInEmail
  | SignInEmailSuccess
  | SignInEmailError
  | SignUpEmail
  | SignUpEmailSuccess
  | SignUpEmailError
  | SignOut
  | SignOutSuccess
  | SignOutError;

