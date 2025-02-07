import { Injectable } from '@angular/core';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { NewEmpresa } from '@models/types/new-empresa';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends CrudService<EmpresaDTO, NewEmpresa> {
  constructor() { 
    super("Empresa");
  }
}
