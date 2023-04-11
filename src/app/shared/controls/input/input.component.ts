import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor{
  @Input() placeholder?: string ;
  @Output() changed = new EventEmitter<string>();

  value?: string ; //Store current value
  isDisable?: boolean ;
  constructor() {
  }
  private propagateChange: any = () => {};
  private  propagateTouched: any = () => {};

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  writeValue(value: string): void {
    this.value = value;
  }
  setDisabledState(isDisabled: boolean) {
    this.isDisable = isDisabled;
  }
  onKeyup(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value)
  }
  onBlur(): void {
    this.propagateTouched();
  }
}
