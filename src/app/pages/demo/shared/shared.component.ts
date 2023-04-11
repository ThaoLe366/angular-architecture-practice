import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {regex, regexErrors} from "@app/shared/controls/utils";
import {ControlItem} from "@app/models/frontend";
import {createLogErrorHandler} from "@angular/compiler-cli/ngcc/src/execution/tasks/completion";
import {markFormGroupTouched} from "@app/shared/controls/utils/form";
import {CheckNullObject} from "@app/validators/check-null-object.validator";

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements  OnInit{
  form: FormGroup = this.fb.group({
    input: [null, {
      updateOn: 'blur',
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(regex.numbers)
      ]
    }],
    password: [null, {
      updateOn: 'blur', validators: [
        Validators.required
      ]
    }],
    select: [null, {
      updateOn: 'change', validators: [
        Validators.required
      ]
    }],
    checkboxes: [null, {
      updateOn: 'change',
      validators: [
        Validators.required,
      ]
    }],
    radio: [null, {
      updateOn: 'change',
      validators: [
        Validators.required,
      ]
    }],
    date: [null, {
      updateOn: 'change',
      validators: [
        Validators.required,
      ]
    }],
    autocomplete: [null, {
      validators: [Validators.required],
      updateOn: 'change',
    }],
    dateRange: [null, {
      updateOn: 'change', validator: [Validators.required, CheckNullObject( ['from', 'to'])]
    }]
  });
  isInline:boolean;
  regexErrors = regexErrors;

  items: ControlItem[];
  constructor(private fb: FormBuilder) {
    // this.form = new FormGroup({});
    this.isInline = true;
    this.items = [
      { label: 'First', value: 11 },
      { label: 'Second', value: 22 },
      { label: 'Third', value: 33 },
      { label: 'Fourth', value: 44 },
      { label: 'Fifth', value: 55 }
    ];
  }
  ngOnInit() {
    // this.form =
  }
  onToggleInline(): void {
    this.isInline = !this.isInline;
  }
  onSubmit() {
    console.log("Submit ", this.form);
    if(!(this.form.valid)) {
      markFormGroupTouched(this.form);
    }
  }
  onPatchValue():void {
      this.form.patchValue({
        input: 123,
        password: 'twenty',
        select: 22,
        checkboxes: [33],
        radio: 22,
        date: new Date().getTime(),
        dateRange: {
          from: new Date(2019, 5, 10).getTime(),
          to: new Date(2019, 5, 25).getTime(),
        },
        autocomplete: 22,
      })
  }

}
