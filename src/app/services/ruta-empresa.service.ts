import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { RutaEmpresaDTO } from '@models/DTOs/ruta-empresa';
import { NewRutaEmpresa } from '@models/types/new-ruta-empresa';
import { identity, lastValueFrom } from 'rxjs';
import { SessionService } from './session.service';
import { PagedResponse } from '@models/api/paged-response';

@Injectable({
  providedIn: 'root'
})
export class RutaEmpresaService extends CrudService<RutaEmpresaDTO, NewRutaEmpresa> {

  constructor() {
    super("RutaEmpresa")
  }

  private sessionService = inject(SessionService);

  public GetPagedByEmpresa(lastId?: number, pageSize?: number): Promise<PagedResponse<RutaEmpresaDTO>> {
    lastId = lastId ?? this.lastId;
    pageSize = pageSize ?? this.pageSize;
    return lastValueFrom(this.http.get<PagedResponse<RutaEmpresaDTO>>(`${this.apiUrl}/GetPagedByEmpresa?LastId=${lastId}&PageSize=${pageSize}&IdEmpresa=${this.sessionService.empresa}`));
  }

  public GetAllByEmpresa(){
    return lastValueFrom(this.http.get<Array<RutaEmpresaDTO>>(`${this.apiUrl}/GetAllByEmpresa?IdEmpresa=${this.sessionService.empresa}`))
  }
}
