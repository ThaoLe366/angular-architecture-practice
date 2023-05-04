import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PersonalForm} from "@app/pages/profile/pages/form/components/personal/personal.component";
import {
  ProfessionalForm,
} from "@app/pages/profile/pages/form/components/professional/professional.component";
import {Observable, Subject, switchAll, switchMap, takeUntil, tap, zip} from "rxjs";
import * as fromDictionaries from "@app/store/dictionaries";
import * as fromRoot from "@app/store";
import * as fromUser from "@app/store/user";
import * as fromForm from "../../store/form";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {StepperService} from "@app/pages/profile/pages/form/components/stepper/services";
import {MapperService} from "@app/pages/profile/pages/form/services/mapper/mapper.service";

export interface ProfileForm {
  personal: PersonalForm,
  professional: ProfessionalForm
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy{
  dictionaries$: Observable<fromDictionaries.Dictionaries>;
  dictionariesIdReady$: Observable<boolean>;


  personal$: Observable<PersonalForm>;
  professional$: Observable<ProfessionalForm>;

  loading$: Observable<boolean>;

  private profile$: Observable<ProfileForm>;
  private user: fromUser.User;

  private isEditing: boolean;
  private destroy = new Subject<any>();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRoot.State>,
              public stepper: StepperService,
              private mapper: MapperService
              ) {
  }
  ngOnInit() {
    this.stepper.init([
      { key: 'personal', label: 'Personal'},
      { key: 'professional', label: 'Professional'}
    ]);

    this.user = (this.route.snapshot.data)?.['user'];
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm));
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm));

    this.dictionaries$ = this.store.pipe(select(fromDictionaries.getDictionaries));
    this.dictionariesIdReady$ = this.store.pipe(select(fromDictionaries.getIsReady));
    console.log("Dictionaries ", this.dictionaries$);
    this.loading$ = this.store.pipe(select(fromUser.getLoading));
    console.log("before user ", this.user)
    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      console.log("form ", form);
      this.store.dispatch( fromForm.setState({form: form})); //TODO:
    }
      this.stepper.complete$.pipe(
        tap(() => console.log("Hello Thao Thanh")),
        switchMap(() => zip(this.profile$, this.dictionaries$)),
        takeUntil(this.destroy)
      ).subscribe(([profile, dictionaries]) => {
        console.log(76)
          this.onComplete(profile, this.user, dictionaries);
      })

      this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
        this.router.navigate(['/profile', this.user.uid]);
      });
  }
  private onComplete(profile: ProfileForm, user: fromUser.User, dictionaries: fromDictionaries.Dictionaries) {
    console.log(85)
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      console.log("87 onCOmpolete ", request)
      this.store.dispatch(fromUser.updateUserRequestState({user: request}));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      console.log("onCOmpolete ", request)
      this.store.dispatch(fromUser.createUserRequestState({user: request}))
    }
  }
  ngOnDestroy() {
    this.destroy.next('');
    this.destroy.complete();
    this.store.dispatch(fromForm.clearState());
  }
  onChangedPersonal(data: PersonalForm): void {
    this.store.dispatch(fromForm.updateState({ changes: { personal: data}}))
  }
  onChangedProfessional(data: ProfessionalForm): void {
    this.store.dispatch(fromForm.updateState({ changes: { professional: data}}));
  }
  get title(): string {
    return this.isEditing ? 'Edit Profile' : 'New Profile'
  }
}
