import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    if (control instanceof Array) {
      return null;
    }
    const array = control as FormArray;
    return array.controls.length < min ? { minArrayLength: true } : null
  };
}
