import { Component } from '@angular/core';
import {Observable} from "rxjs";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";
import * as fromDictionaries from "@app/store/dictionaries";
import {select, Store} from "@ngrx/store";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-component';
  isAuthorized$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
  }
  ngOnInit() {
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized))
    this.store.dispatch(fromUser.initState());
    this.store.dispatch(fromDictionaries.readState());

  }

  onSignOut() : void {
    this.store.dispatch(new fromUser.SignOut());
  }
}
