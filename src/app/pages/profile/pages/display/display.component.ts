import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromProfileUser from '../../store/user'
import {ActivatedRoute, Params} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {Employee, Recruiter} from "@app/store/user";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit, OnDestroy{
  user$: Observable<fromProfileUser.User>;
  isOwnProfile$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromProfileUser.getUser));

    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      this.store.dispatch(new fromProfileUser.Read(id));

      this.isOwnProfile$ = this.store.pipe(
        select(fromUser.getUser),
        map(user => user && user.uid === id)
      )

    })
  }

  ngOnDestroy() {
    this.store.dispatch(new fromProfileUser.Clear());
  }
  getRecruiter(user: Employee | Recruiter) {
    return (user as Recruiter);
  }
  getEmployee(user: Employee | Recruiter) {
    return (user as Employee);
  }
}
