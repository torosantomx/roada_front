import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UsuarioDTO } from '@models/DTOs/usuarioDTO';
import { NewUsuario } from '@models/types/new-usuario';
import { InfoNewUsuario } from '@models/custom-entities/info-new-usuario';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<UsuarioDTO, NewUsuario> {

  constructor() {
    super("Usuario")
  }
  public async registerUser(info: InfoNewUsuario): Promise<boolean> {
    return lastValueFrom(this.http.post<boolean>(`${this.apiUrl}/RegisterUser`, info));
  }
  public CheckIfUsuarioExits(usuario: string) {
    return this.http.get<boolean>(`${this.apiUrl}/CheckIfUserExits?usuario=${usuario}`)
  }
}
