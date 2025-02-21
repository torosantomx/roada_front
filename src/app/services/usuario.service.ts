import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UsuarioDTO } from '@models/DTOs/usuarioDTO';
import { NewUsuario } from '@models/types/new-usuario';
import { lastValueFrom } from 'rxjs';
import { PasswordChangedInfo } from '@models/custom-entities/password-changed-info';
import { UpdatableInfoUser } from '@models/types/updatable-info-user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<UsuarioDTO, NewUsuario> {
  constructor() {
    super("Usuario")
  }
  public async registerUser(info: NewUsuario): Promise<boolean> {
    return lastValueFrom(this.http.post<boolean>(`${this.apiUrl}/RegisterUser`, info));
  }
  public checkIfUsuarioExits(usuario: string, usuarioEnEdicion?: string) {
    let url = `${this.apiUrl}/CheckIfUserExits?user=${usuario}`;

    if (usuarioEnEdicion)
      url = `${url}&userInEdition=${usuarioEnEdicion}`;
    return this.http.get<boolean>(url)
  }

  public changePassword(info: PasswordChangedInfo) {
    return lastValueFrom(this.http.put<boolean>(`${this.apiUrl}/ChangePassword`, info));
  }

  public changeDataUser(info: UpdatableInfoUser) {
    return lastValueFrom(this.http.put<UsuarioDTO>(`${this.apiUrl}/ChanceUsuarioInfo`, info));
  }
}
