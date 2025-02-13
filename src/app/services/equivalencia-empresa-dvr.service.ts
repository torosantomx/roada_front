import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { EquivalenciaEmpresaDvrDTO } from '@models/DTOs/equivalencia-empresa-dvr';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaEmpresaDvrService extends BaseHttpService {

  constructor() {
    super("EquivalenciaEmpresaDvr");
  }
  public async GetUnassigned(idDvr?: number): Promise<Array<EquivalenciaEmpresaDvrDTO>> {
    
    let url = '/Unassigned'
    if(idDvr) {
      url = `${url}?IdDvr=${idDvr}`
    }
    return lastValueFrom(this.http.get<Array<EquivalenciaEmpresaDvrDTO>>(`${this.apiUrl}${url}`));
  }
}
