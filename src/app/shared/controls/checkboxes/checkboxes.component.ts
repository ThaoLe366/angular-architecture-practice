import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "@app/models/frontend";

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxesComponent),
    multi: true,
  }]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor{

  @Input() items: ControlItem[];
  @Output() changed= new EventEmitter<Value[]>();

  value: Value[];  //List checked value;
  isDisable?: boolean;

  constructor() {
    this.items = [];
    this.value = [];
  }
  private propagationChange: any = () => {};

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.propagationChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  writeValue(value: Value[]): void {
    this.value = value;
  }

  onChanged(value: Value, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
   const selected = this.getSelected(value, checked);

   this.value = selected;
   this.changed.emit(selected);
   this.propagationChange(selected);
  }
  private getSelected(value: Value, checked: boolean) {
    const selected: Value[] = this.value ? [...this.value] : [];

    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    return selected.length ? selected : [];
  }

  isCheck(value: Value): boolean {
    return this.value && ((this.value ? this.value : []).includes(value)) ;
  }
}
