import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "@app/models/frontend";

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadiosComponent),
    multi: true,
  }]
})
export class RadiosComponent implements OnInit, ControlValueAccessor{
    @Input() items: ControlItem[];
    @Output() changed = new EventEmitter<Value>();

    value?: Value;
    isDisable?: boolean;
    constructor() {
      this.items = []
    }
  ngOnInit(): void {
  }
  private propagateChange: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  writeValue(value: Value): void {
    this.value = value;
  }

  onChange(event: Event) :void{
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
  isChecked(value: Value) {
    return this.value == value;
  }

}
