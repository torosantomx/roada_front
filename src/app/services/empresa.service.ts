import { Injectable } from '@angular/core';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { NewEmpresa } from '@models/types/new-empresa';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends BaseHttpService<EmpresaDTO, NewEmpresa> {
  constructor() { 
    super("Empresa");
  }
}
