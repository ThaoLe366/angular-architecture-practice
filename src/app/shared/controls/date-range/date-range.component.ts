import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Value} from "@app/models/frontend";
export interface ValueDateRange {
  from: number;
  to: number;
}
export interface Placeholder {
  from: string;
  to: string;
}
@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor{
  @Input() placeholder : Placeholder;
  @Output() change = new EventEmitter<ValueDateRange>();

  form: FormGroup = this.fb.group({
    from: [null],
    to: [null]
  });
  constructor(private  fb: FormBuilder) {
    this.placeholder = {
      from: '',
      to: '',
    };
  }
  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  get min() : Date {
    const from = this.form.controls?.['from'].value;
    return from;
  }

  get max(): Date {
    const to = this.form.controls?.['to'].value;
    return to;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  get from(): FormControl {
    return (this.form.controls)?.['from'] as FormControl;
  }
  get to(): FormControl {
    return (this.form.controls)?.['to'] as FormControl;
  }
  setDisabledState(isDisabled: boolean): void {
    if(isDisabled) {
      // this.from.disable();
      // this.to.disable();
      this.form.disable();
    } else {
      this.form.enable();
      // this.from.enable();
      // this.to.enable();
    }
  }

  writeValue(value: ValueDateRange): void {
    this.form.patchValue(value || {});
  }
  onChange(): void {
    const value = { ...this.form.value };

    this.propagateChange(value);
    this.change.emit(value);
  }
  onClose(): void {
    this.propagateTouched();
  }
}
