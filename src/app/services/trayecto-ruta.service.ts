import { inject, Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { NewTrayectoRuta } from '@models/types/new-trayecto-ruta';
import { SessionService } from './session.service';
import { lastValueFrom } from 'rxjs';
import { TrayectoRutaDTO } from '@models/DTOs/trayectoRutaDTO';

@Injectable({
  providedIn: 'root'
})
export class TrayectoRutaService extends CrudService<TrayectoRutaDTO, NewTrayectoRuta> {
  constructor() { 
    super("TrayectoRuta")
  }
  private sessionService = inject(SessionService);

  public getUnassignedTrayectoRutaByEmpresa() {
    return lastValueFrom(this.http.get<Array<TrayectoRutaDTO>>(`${this.apiUrl}/GetUnassignedTrayectoRutaByEmpresa?IdEmpresa=${this.sessionService.empresa}`))    
  }
}
