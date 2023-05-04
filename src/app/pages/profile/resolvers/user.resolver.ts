import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import * as fromUser from "@app/store/user";
import * as fromRoot from "@app/store"
import {select, Store} from "@ngrx/store";
import {filter, Observable, take} from "rxjs";

@Injectable()
export class UserResolver implements Resolve<fromUser.User> {
  constructor(private store: Store<fromRoot.State>) {
  }
  resolve(): Observable<fromUser.User>  {
    console.log("from resolver ", this.store.pipe(select(fromUser.getUser), filter(user => !!user), take(1)));
    return this.store.pipe(select(fromUser.getUser),
      filter(user => !!user),
      take(1)
      )
  }
}
