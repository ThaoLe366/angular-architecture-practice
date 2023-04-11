import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import { MatDatepickerInputEvent} from "@angular/material/datepicker";
type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor{
  @Input() placeholder: string;
  @Input() min?: Date;
  @Input() max?: Date;

  @Output() changed = new EventEmitter<Value>();
  @Output() closed = new EventEmitter<void>();

  value?: Value;
  isDisable: boolean;

  constructor() {
    this.placeholder = '';
    this.isDisable = false;
  }
  ngOnInit(): void {

  }

  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
  }

  private propagateChange: any = () => {};
  private propagateTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  writeValue(value: Value): void {
    this.value = value
  }
  onChange(event: MatDatepickerInputEvent<Date>):void {
    const value = event.value ? event.value.getTime() : undefined;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
  onClosed(): void {
    this.propagateTouch();
    this.closed.emit();
  }
}
