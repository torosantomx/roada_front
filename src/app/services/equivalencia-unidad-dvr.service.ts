import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { EquivalenciasUnidadValidadorDTO } from '@models/DTOs/equivalencias-unidad-validadorDTO';
import { EquivalenciaUnidadDvrDTO } from '@models/DTOs/equivalencia-unidad-dvr';
import { lastValueFrom } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaUnidadDvrService extends BaseHttpService {
  constructor() {
    super("EquivalenciaUnidadDvr");
  }

  private sessionService = inject(SessionService);

  public async GetUnassigned(idEquivalencia?: number): Promise<Array<EquivalenciaUnidadDvrDTO>> {

    let url = `/Unassigned?IdEmpresa=${this.sessionService.empresa}`
    if(idEquivalencia) {
      url = `${url}&IdEquivalencia=${idEquivalencia}`
    }
    return lastValueFrom(this.http.get<Array<EquivalenciaUnidadDvrDTO>>(`${this.apiUrl}${url}`));
  }
}
