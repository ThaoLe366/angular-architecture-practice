import {FormControl, FormGroup} from "@angular/forms";

export const markFormGroupTouched = (formGroup: any) => {
  console.log("form group 2", formGroup);
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();
    if(control.controls) {
      markFormGroupTouched(control);
    }
  })
}
