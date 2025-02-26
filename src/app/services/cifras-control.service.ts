import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { SessionService } from './session.service';
import { environment } from '@environments/environment';
import { lastValueFrom } from 'rxjs';
import { PagedResponse } from '@models/api/paged-response';
import { CifrasControlDTO } from '@models/DTOs/cifras-control';

@Injectable({
  providedIn: 'root'
})
export class CifrasControlService extends BaseHttpService {

  constructor() {
    super("CifrasControl")
  }

  private sessionService = inject(SessionService);

  public getPagedByEmpresa(lastId?: number, pageSize?: number, date?: string, idProceso?: number) {
    lastId = lastId ?? environment.pagination.defaultLastId;
    pageSize = pageSize ?? environment.pagination.defaultPageSize;

    let url = `${this.apiUrl}/GetPagedByEmpresa?LastId=${lastId}&PageSize=${pageSize}&IdEmpresa=${this.sessionService.empresa}`;

    if (date) {
      url = `${url}&Fecha=${date}`;
    }
    if (idProceso)
      url = `${url}&IdProceso=${idProceso}`;

    return lastValueFrom(this.http.get<PagedResponse<CifrasControlDTO>>(url));
  }

  public reProcess(cifra: CifrasControlDTO) {
    return lastValueFrom(this.http.put<CifrasControlDTO>(`${this.apiUrl}`, cifra))
  }
}
