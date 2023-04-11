import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import { Value, ControlItem} from "@app/models/frontend";
import {distinctUntilChanged, filter, from, map, Observable, of, startWith, Subject, takeUntil} from "rxjs";
// Observer là tập hợp các callback tương ứng để lắng nghe các giá trị (next, complete, error,...);
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true,
  }]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor{
  @Input() items: ControlItem[];
  @Input() placeholder?: string;

  @Output() change = new EventEmitter<Value>();

  constructor() {
      this.items = [];
      this.options$ = of([]);
  }

  formControl = new FormControl();
  options$: Observable<ControlItem[]>; // Observable nhận vào 1 Observer, và sẽ bắn dữ liệu ra.
  private destroy = new Subject<any>(); // Dùng để gửi dữ liệu đến nhiều observer.

  ngOnDestroy(): void { //TODO: check work?
    this.destroy.next('');
    this.destroy.complete();
  }
  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  ngOnInit(): void {
    // @ts-ignore
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string' || typeof value === 'object'),
      map(value => typeof value === 'string' ? value : value.label),
      map(label => label ? this.filter(label) : this.items.slice())
    );

    //TODO: return slice to get new array of object

    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),    // cho đến khi bị destroy
      distinctUntilChanged(),   // 2 giá trị liền kề phải khác nhau
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.value : null;
      console.log("From value change ", value);
      this.propagateChange(value);
      this.change.emit(value);
    });
  }
  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item =>  item.label.toLowerCase().includes(filterValue));
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable()
    }
  }

  writeValue(value: Value): void {
    const selectedOption = this.items.find(item => item.value == value);
    console.log(80, value, selectedOption);
    this.formControl.setValue(selectedOption);
  }
  displayFN(item?: ControlItem): string {
    return item ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
