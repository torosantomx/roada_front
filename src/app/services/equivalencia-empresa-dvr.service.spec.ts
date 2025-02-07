import { TestBed } from '@angular/core/testing';

import { EquivalenciaEmpresaDvrService } from './equivalencia-empresa-dvr.service';

describe('EquivalenciaEmpresaDvrService', () => {
  let service: EquivalenciaEmpresaDvrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciaEmpresaDvrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
