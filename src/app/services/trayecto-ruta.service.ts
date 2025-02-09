import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { TrayectoRuta } from '@models/DTOs/trayectoRutaDTO';
import { NewTrayectoRuta } from '@models/types/new-trayecto-ruta';

@Injectable({
  providedIn: 'root'
})
export class TrayectoRutaService extends CrudService<TrayectoRuta, NewTrayectoRuta> {
  constructor() { 
    super("TrayectoRuta")
  }
}
