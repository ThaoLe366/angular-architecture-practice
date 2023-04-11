import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "@app/models/frontend";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
  }]
})
export class SelectComponent implements OnInit, ControlValueAccessor{
    @Input() items: ControlItem[];
    @Input() placeholder?: string;
    @Output() changed = new EventEmitter<Value>();

    value?: Value;
    isDisable?: boolean;

    constructor() {
      this.items = [];
    }

  ngOnInit(): void {
  }
    private propagateChange: any = () => {};
    private propagateTouched: any = () => {};
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  writeValue(value: Value): void {
    console.log('45, ', value);
    this.value = value;
  }
  onChange(event: MatSelectChange): void {
    console.log('49 ', event)
    const value = event.value ? event.value : null;
  console.log(51, value);
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
  onBlur(): void {
    this.propagateTouched();
  }
}
