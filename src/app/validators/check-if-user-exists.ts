import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { UsuarioService } from "@services/usuario.service";
import { catchError, map, Observable, of } from "rxjs";

export function checkIfUsuarioExits(usuarioService: UsuarioService, usuarioEnEdicion?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const usuario = control.value;

    return usuarioService.checkIfUsuarioExits(usuario, usuarioEnEdicion).pipe(
      map(res => {
        return res ? { checkIfExists: true} : null;
      }),
      catchError(() => of(null))
    );
  };
}