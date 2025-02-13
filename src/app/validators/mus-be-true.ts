import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustBeTrue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isTrue = control.value === true;
        return isTrue ? null : { mustBeTrue: { value: control.value } };
    };
}
