import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isValueTaken(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent;

    if (!formGroup) {
      return null;
    }
    const formArray = formGroup.parent as FormArray;

    if (!formArray) {
      return null;
    }

    const value = Number(control.value);
    if (!value) return null;


    const selectedValues = formArray.controls
      .map((fg) => fg.get(controlName)?.value)
      .filter((v) => v !== null && v !== '');
      
    const occurrences = selectedValues.filter((v) => v === value).length;
    return occurrences > 1  ? { valueIsTaken: true } : null;
  };
}
