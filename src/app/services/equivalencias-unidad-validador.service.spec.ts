import { TestBed } from '@angular/core/testing';

import { EquivalenciasUnidadValidadorService } from './equivalencias-unidad-validador.service';

describe('EquivalenciasUnidadValidadorService', () => {
  let service: EquivalenciasUnidadValidadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciasUnidadValidadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
