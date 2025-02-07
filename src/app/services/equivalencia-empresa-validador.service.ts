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
  public async GetUnassigned(idEmpresa?: number): Promise<Array<EquivalenciaEmpresaValidadorDTO>> {
    let url = '/Unassigned'
    if(idEmpresa) {
      url = `${url}?IdEmpresa=${idEmpresa}`
    }
      return lastValueFrom(this.http.get<Array<EquivalenciaEmpresaValidadorDTO>>(`${this.apiUrl}${url}`));
    }
}
