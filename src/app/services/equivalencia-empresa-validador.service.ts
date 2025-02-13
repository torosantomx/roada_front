import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { EquivalenciaEmpresaValidadorDTO } from '@models/DTOs/equivalencia-empresa-validador';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaEmpresaValidadorService extends BaseHttpService {
  constructor() {
    super("EquivalenciaEmpresaValidador")
  }
  public async GetUnassigned(idValidador?: number): Promise<Array<EquivalenciaEmpresaValidadorDTO>> {
    let url = '/Unassigned'
    if (idValidador) {
      url = `${url}?IdValilador=${idValidador}`
    }
    return lastValueFrom(this.http.get<Array<EquivalenciaEmpresaValidadorDTO>>(`${this.apiUrl}${url}`));
  }
}
