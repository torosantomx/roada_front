import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UnidadAutoDTO } from '@models/DTOs/unidad-auto';
import { NewUnidadAuto } from '@models/types/new-unidad-auto';
import { PagedResponse } from '@models/api/paged-response';
import { lastValueFrom, Observable } from 'rxjs';
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
    if (search) {
      url = `${url}&Search=${search}`
    }
    return await lastValueFrom(this.http.get<PagedResponse<UnidadAutoDTO>>(`${this.apiUrl}${url}`));
  }
  public checkIfClaveExists(clave: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/CheckIfClaveExists?Clave=${clave}`)
  }
  public checkIfEconomicoExisteInEmpresa(idEmpresa: number, economico: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/CheckIfEconomicoExistsInEmpresa?IdEmpresa=${idEmpresa}&Economico=${economico}`)
  }
  public getEconomicosByEmpresa(): Promise<Array<string>> {
    return lastValueFrom(this.http.get<Array<string>>(`${this.apiUrl}/GetEconomicosByEmpresa?IdEmpresa=${this.sessionService.empresa}`));
  }
  public getClaves(): Promise<Array<number>> {
    return lastValueFrom(this.http.get<Array<number>>(`${this.apiUrl}/GetClaves`));
  }

  public getAllByEmpresa() {
    return lastValueFrom(this.http.get<Array<UnidadAutoDTO>>(`${this.apiUrl}/GetByEmpresa?IdEmpresa=${this.sessionService.empresa}`))
  }
}
