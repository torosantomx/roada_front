import { TestBed } from '@angular/core/testing';

import { TrayectoRutaService } from './trayecto-ruta.service';

describe('TrayectoRutaService', () => {
  let service: TrayectoRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrayectoRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
