import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function evenNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value % 2 === 0 ? null : { evenNumber: true };
  };
}
