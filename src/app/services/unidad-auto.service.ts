import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UnidadAutoDTO } from '@models/DTOs/unidad-auto';
import { NewUnidadAuto } from '@models/types/new-unidad-auto';
import { PagedResponse } from '@models/api/paged-response';
import { lastValueFrom } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadAutoService extends CrudService<UnidadAutoDTO, NewUnidadAuto> {

  constructor() {
    super("UnidadAuto")
  }

  private sessionService = inject(SessionService);

  public async getPagedWithSearchAndEmpresa(lastId?: number, pageSize?: number, search?: string,): Promise<PagedResponse<UnidadAutoDTO>> {
      lastId = lastId ?? this.lastId;
      pageSize = pageSize ?? this.pageSize;    
      let url = `/GetPaged?PageSize=${pageSize}&LastId=${lastId}&IdEmpresa=${this.sessionService.empresa}`
      if (search){
        url = `${url}&Search=${search}`
      }
      return await lastValueFrom(this.http.get<PagedResponse<UnidadAutoDTO>>(`${this.apiUrl}${url}`));
    }
}
