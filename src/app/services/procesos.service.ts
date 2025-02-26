import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ProcesosDTO } from '@models/DTOs/procesosDTO';
import { NewProceso } from '@models/types/new-procesos';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService extends CrudService<ProcesosDTO, NewProceso>{

  constructor() { 
    super("Procesos")
  }

}
