import { HttpClient } from '@angular/common/http';
import { inject} from '@angular/core';
import { environment } from '@environments/environment';
import { PagedResponse } from '@models/custom-entities/paged-response';
import { lastValueFrom } from 'rxjs';


export abstract class BaseHttpService<TDto, TNewEntity> {
  constructor(controller: string) {
    this.apiUrl = `${environment.api}${controller}`;
  }
  protected http: HttpClient = inject(HttpClient);
  protected apiUrl: string;
  protected lastId = environment.pagination.defaultLastId;
  protected pageSize = environment.pagination.defaultPageSize;

  public async getById<T>(id: string): Promise<TDto> {
    return await lastValueFrom(this.http.get<TDto>(`${this.apiUrl}/?Id=${id}`));
  }

  public async getAll(): Promise<Array<TDto>> {
    return await lastValueFrom(this.http.get<Array<TDto>>(this.apiUrl));
  }
  public async getPaged(lastId?: number, pageSize?: number): Promise<PagedResponse<TDto>> {
    lastId = lastId ?? this.lastId;
    pageSize = pageSize ?? this.pageSize;
    return await lastValueFrom(this.http.get<PagedResponse<TDto>>(`${this.apiUrl}/GetPaged?LastId=${lastId}&PageSize=${pageSize}`));
  }

  // public async getPagedWithSearch(search?: string, pageNumber?: number, pageSize?: number, methodName: string = ''): Promise<PagedResponse<TDto>> {
  //   pageNumber = pageNumber ?? this.pageNumber;
  //   pageSize = pageSize ?? this.pageSize;
  //   search = search ?? '';
  //   return await lastValueFrom(this.http.get<PagedResponse<TDto>>(`${this.apiUrl}/${methodName}?search=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`));
  // }
  public async post(body: TNewEntity): Promise<TDto> {
    return await lastValueFrom(this.http.post<TDto>(this.apiUrl, body));
  }

  public async put<TType = TDto>(body: TType): Promise<TDto> {
    return await lastValueFrom(this.http.put<TDto>(this.apiUrl, body));
  }

  public async delete(id: number): Promise<boolean> {
    return await lastValueFrom(this.http.delete<boolean>(`${this.apiUrl}?id=${id}`));
  }
}
