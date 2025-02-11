import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { EquivalenciasUnidadValidadorDTO } from '@models/DTOs/equivalencias-unidad-validadorDTO';
import { EquivalenciaUnidadDvrDTO } from '@models/DTOs/equivalencia-unidad-dvr';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaUnidadDvrService extends BaseHttpService {
  constructor() {
    super("EquivalenciaUnidadDvr");
  }

  public async GetUnassigned(idEmpresa: number, idEquivalencia?: number): Promise<Array<EquivalenciaUnidadDvrDTO>> {

    let url = `/Unassigned?IdEmpresa=${idEmpresa}`
    if(idEquivalencia) {
      url = `${url}&IdEquivalencia=${idEquivalencia}`
    }
    return lastValueFrom(this.http.get<Array<EquivalenciaUnidadDvrDTO>>(`${this.apiUrl}${url}`));
  }
}
