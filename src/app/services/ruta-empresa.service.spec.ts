import { TestBed } from '@angular/core/testing';

import { RutaEmpresaService } from './ruta-empresa.service';

describe('RutaEmpresaService', () => {
  let service: RutaEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
