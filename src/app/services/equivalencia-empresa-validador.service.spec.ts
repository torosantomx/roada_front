import { TestBed } from '@angular/core/testing';

import { EquivalenciaEmpresaValidadorService } from './equivalencia-empresa-validador.service';

describe('EquivalenciaEmpresaValidadorService', () => {
  let service: EquivalenciaEmpresaValidadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciaEmpresaValidadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
