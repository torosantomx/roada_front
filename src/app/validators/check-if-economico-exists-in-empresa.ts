import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UnidadAutoService } from "@services/unidad-auto.service";
import { catchError, map, Observable, of } from "rxjs";

export function checkIfEconomicoExisteInEmpresa(unidadAutoService: UnidadAutoService, idEmpresa: number, economicoInEdition?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const economico = control.value;

    return unidadAutoService.checkIfEconomicoExisteInEmpresa(idEmpresa, economico, economicoInEdition).pipe(
      map(res => {
        return res ? { checkIfExists: true } : null;
      }),
      catchError(() => of(null))
    );
  };
}