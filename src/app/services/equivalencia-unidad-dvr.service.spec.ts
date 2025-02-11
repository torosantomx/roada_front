import { TestBed } from '@angular/core/testing';

import { EquivalenciaUnidadDvrService } from './equivalencia-unidad-dvr.service';

describe('EquivalenciaUnidadDvrService', () => {
  let service: EquivalenciaUnidadDvrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciaUnidadDvrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
