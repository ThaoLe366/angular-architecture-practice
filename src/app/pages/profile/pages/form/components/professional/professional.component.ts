import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {RecruiterForm} from "@app/pages/profile/pages/form/components/professional/roles/recruiter/recruiter.component";
import {EmployeeForm} from "@app/pages/profile/pages/form/components/professional/roles/employee/employee.component";
import {Dictionaries} from "@app/store/dictionaries";
import {markFormGroupTouched, regexErrors} from "@app/shared/controls/utils";
import {Subject, takeUntil, tap} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StepperService} from "@app/pages/profile/pages/form/components/stepper/services";


export interface ProfessionalForm {
  about: string,
  roleId: string;
  role: RecruiterForm | EmployeeForm;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit, OnDestroy{
  @Input() value: ProfessionalForm;
  @Input() dictionaries: Dictionaries;

  @Output() changed = new EventEmitter<ProfessionalForm>();

  form: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private stepper: StepperService) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }],
      about: [null]
    });
    if(this.value) {
      this.form.patchValue(this.value);
    }
    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      if(!this.form.valid) {
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      } else {
        this.changed.emit(this.form.value);
      }
      console.log('57, ', type, this.form.valid);
      this.stepper[type].next(this.form.valid);
      console.log('59, ', this.stepper.complete$.pipe(tap(value => console.log(659, value))));
    })
  }

  ngOnDestroy() {
    this.destroy.next('');
    this.destroy.complete();
  }
  getEmployeeForm() {
    return (this.value.role as EmployeeForm);
  }
}
