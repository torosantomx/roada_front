import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UnidadAutoService } from "@services/unidad-auto.service";
import { catchError, map, Observable, of } from "rxjs";

export function checkIfUnidadExists(unidadAutoService: UnidadAutoService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const clave = control.value;

    return unidadAutoService.checkIfClaveExists(clave).pipe(
      map(res => {
        return res ? { checkIfExists: { value: true } } : null;
      }),
      catchError(() => of(null))
    );
  };
}