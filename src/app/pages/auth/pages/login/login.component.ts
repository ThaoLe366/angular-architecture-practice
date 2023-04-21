import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {regex, regexErrors, markFormGroupTouched} from "@app/shared/controls/utils";
import {select, Store} from "@ngrx/store";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";
import {signInEmailState} from "@app/store/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading$: Observable<boolean>;
  form: FormGroup;
  regexErrors= regexErrors;
  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.State>) {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    this.form = this.fb.group({
      email: [null, {
        updateIn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email),
        ]
      }],
      password: [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ]
      }]
    })
  }

  public onSubmit(): void {
    console.log("Hello from submit")
    if(this.form.valid) {
      console.log("46")
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      }
      console.log("46")
      this.store.dispatch(fromUser.signInEmailState({credentials: credentials}));
    }
    else {
      console.log("50")
      markFormGroupTouched(this.form);
    }
  }
}
