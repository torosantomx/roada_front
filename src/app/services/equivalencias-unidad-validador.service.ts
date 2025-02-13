import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { EquivalenciasUnidadValidadorDTO } from '@models/DTOs/equivalencias-unidad-validadorDTO';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciasUnidadValidadorService extends BaseHttpService {
  constructor() {
    super("EquivalenciasUnidadValidador");
  }

  public async GetUnassigned(idEquivalencia?: number): Promise<Array<EquivalenciasUnidadValidadorDTO>> {
    let url = `/Unassigned`
    if(idEquivalencia) {
      url = `${url}&idEquivalencia=${idEquivalencia}`
    }
    return lastValueFrom(this.http.get<Array<EquivalenciasUnidadValidadorDTO>>(`${this.apiUrl}${url}`));
  }
}
