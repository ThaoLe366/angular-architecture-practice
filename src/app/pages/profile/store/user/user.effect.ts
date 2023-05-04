

import * as fromActions from './user.action';
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {catchError, map, of, switchMap, take, tap} from "rxjs";
import {User} from "@app/models/backend";
type Action =  fromActions.All;

@Injectable()
export class UserEffects {
  constructor(private actions: Actions,
              private afs: AngularFirestore) {
  }
  read = createEffect(() => this.actions.pipe(
    ofType(fromActions.Types.READ),
    switchMap((action: fromActions.Read) =>
     this.afs.doc<User>(`users/${action.id}`).valueChanges().pipe(
      take(1),
      tap((user) => console.log("Success get user = ", user)),
      map((user) =>  new fromActions.ReadSuccess(user)),
      catchError(err => of(new fromActions.ReadError(err.message)))
    ))
  ))
}
