import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { TurnoDTO } from '@models/DTOs/turnoDTO';
import { NewTurno } from '@models/types/new-turno';
import { lastValueFrom } from 'rxjs';
import { SessionService } from './session.service';
import { PagedResponse } from '@models/api/paged-response';

@Injectable({
  providedIn: 'root'
})
export class TurnoService extends CrudService<TurnoDTO, NewTurno> {

  constructor() {
    super("Turno")
  }
  private sessionService = inject(SessionService)

  public getPagedByDate(lastId?: number, pageSize?: number, date?: string) {
    lastId = lastId ?? this.lastId;
    pageSize = pageSize ?? this.pageSize;
    let url = `/GetPaged?IdEmpresa=${this.sessionService.empresa}&LastId=${lastId}&PageSize=${pageSize}`
    if (date) {
      url = `${url}&Fecha=${date}`
    }
    return lastValueFrom(this.http.get<PagedResponse<TurnoDTO>>(`${this.apiUrl}${url}`))
  }

  public eraseTurnos(date: string) {
    return lastValueFrom(this.http.delete(`${this.apiUrl}/EraseByEmpresaAndDate?IdEmpresa=${this.sessionService.empresa}&Fecha=${date}`))
  }
}
