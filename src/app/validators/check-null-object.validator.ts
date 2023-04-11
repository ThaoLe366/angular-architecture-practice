import {AbstractControl, ValidatorFn} from "@angular/forms";

export function CheckNullObject( [...properties]): ValidatorFn  {
  return (control: AbstractControl): { [key: string]: any} => {
    console.log(5)
    let controlVal = control.value;

    console.log(6, 'Invalidator, ', controlVal, properties)
    for(let i =0; i< properties.length; i++) {
         if(Object.values(controlVal).indexOf(properties[i]) <= 0) {
           return { nameProperty: "This field is required"}
         }
      }
    return {};
  }
}
