import { Injectable } from '@angular/core';
import { HttpBase } from './base-http.service';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { NewEmpresa } from '@models/types/new-empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends HttpBase<EmpresaDTO, NewEmpresa> {
  constructor() { 
    super("Empresa");
  }
}
