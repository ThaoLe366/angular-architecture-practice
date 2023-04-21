import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { regex, regexErrors, markFormGroupTouched } from '@app/shared/controls/utils';
import {Observable} from "rxjs";
import * as fromRoot from "@app/store";
import * as fromUSer from "@app/store/user";
import {select, Store} from "@ngrx/store";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  form: FormGroup = this.fb.group({
    email: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(regex.email)
      ]
    }],
    password: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(regex.password)
      ]
    }],
    passwordRepeat: [null, {
      updateOn: 'blur', validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern(regex.password)
      ]
    }]
  }, { validator: this.repeatPasswordValidator});
  regexErrors= regexErrors;
  loading$: Observable<boolean> ;
  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.State>) {

  }
  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUSer.getLoading));
}
  private repeatPasswordValidator(group: FormGroup): {[key: string]: boolean} | null {
      const password = group.get('password');
      const passwordRepeat = group.get('passwordRepeat');
      return passwordRepeat?.value && password?.value !== passwordRepeat.value ? { repeat: true } : null;
  }
  onSubmit():void {
    console.log(55, this.form);
    if(this.form.valid) {
      const value = this.form.value;
      const credentials: fromUSer.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      };
      this.store.dispatch(new fromUSer.SignUpEmail(credentials))
    } else {
      markFormGroupTouched(this.form);
    }
  }

}
