
import * as fromAction from './user.actions';
// @ts-ignore
import * as jsonCountries from '@src/assets/countries.json';
import {AngularFirestore, DocumentChangeAction} from "@angular/fire/compat/firestore";
import {ControlItem, Item} from "@app/models/frontend";
import {Dictionary} from "../dictionaries";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {NotificationService} from "@app/pages/demo/service";
import {catchError, from, map, of, switchMap, take, tap, withLatestFrom} from "rxjs";
import {authState, sendEmailVerification} from "@angular/fire/auth";
import {User} from "@app/models/backend";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {environment} from "@app/environments/environment";

import * as firebase from 'firebase/compat/app';
type Action = fromAction.All;

@Injectable()
export class UserEffect {
  constructor(private action: Actions,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private notification: NotificationService) {
  }
  // @ts-ignore
  init$= createEffect(() => this.action.pipe(
    ofType(fromAction.Types.INIT),
    tap(() => console.log("Hello from init")),
    switchMap(() => this.afAuth.authState.pipe(take(1))),
    switchMap(authState => {
      if(authState) {
        return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
          take(1),
          map(user => new fromAction.InitAuthorized(authState.uid, user || null)),
          catchError(err => of(new fromAction.InitError(err.message)))
        );

      } else {
        return of(new fromAction.InitUnauthorized());
      }
    }) ));

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  signInEmail$= createEffect(() => this.action.pipe(
    ofType(fromAction.Types.SIGN_IN_EMAIL),
    map((action: fromAction.SignInEmail) => action.credentials),
    switchMap(credentials =>
      from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password))
        .pipe(
          switchMap(signInState =>
              this.afs.doc<User>(`users/${(signInState.user)?.uid}`).valueChanges().pipe(
                take(1),
                tap(()=> {
                  this.router.navigate(['/']);
                }),
                map(user  => new fromAction.SignInEmailSuccess((signInState?.user)?.uid || '', user || null))
              )),
          catchError(err => {
            this.notification.error(err.message());
            return of(new fromAction.SignInEmailError(err.message()))
          })
          ))
  ))
  signUpEmail$ = createEffect(() => this.action.pipe(
    ofType(fromAction.Types.SIGN_UP_EMAIL),
    map((action: fromAction.SignUpEmail) => action.credentials),
    switchMap(credentials => from(this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password))
      .pipe(
        tap(() => {
          this.afAuth.sendSignInLinkToEmail(credentials.email, environment.actionCodeSettings);
          this.router.navigate(['/auth/email-confirm']);
        }),
        map((signUpState) => new fromAction.SignUpEmailSuccess((signUpState?.user)?.uid || '')),
        catchError(err => {
          this.notification.error(err.message);
          return of(new fromAction.SignUpEmailError(err.message))
        })
      ))
  ))
  signOut$ = createEffect(() => this.action.pipe(
    ofType(fromAction.Types.SIGN_OUT),
    switchMap(() => from(this.afAuth.signOut()).pipe(
      map(() => new fromAction.SignOutSuccess()),
      catchError(err => of(new fromAction.SignOutError(err.message)))
    ))
  ))

  createInEffect$ = createEffect(() => this.action.pipe(
    ofType(fromAction.Types.CREATE),
    map((action: fromAction.Create) => action.user),
    tap(user => console.log(11962, user)),
    withLatestFrom(this.afAuth.authState.pipe(take(1))),
    map(([user, state]) => ({
      ...user,
      uid: state.uid,
      email: state.email,
      created: firebase.default.firestore.FieldValue.serverTimestamp(),
    })),
    switchMap((user: User) => from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
      tap(() => this.router.navigate(['/profile', user.uid])),
      map(() =>  fromAction.createUserRequestSuccessState({user})),
      catchError(err => of( fromAction.createUserRequestErrorState(err.message)))
    ))
  ))

  updateInEffect$ = createEffect(() => this.action.pipe(ofType(fromAction.Types.UPDATE),
    map((action: fromAction.Update) => action.user),
    tap(user => console.log(112, user)),
    switchMap(user => from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
      tap(() => this.router.navigate(['/profile', user.uid])),
      map(() =>  fromAction.updateUserRequestSuccessState({user})),
      catchError(err => of( fromAction.updateUserRequestErrorState(err))
    )))));

}
