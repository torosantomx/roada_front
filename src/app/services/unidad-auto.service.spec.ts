import { TestBed } from '@angular/core/testing';

import { UnidadAutoService } from './unidad-auto.service';

describe('UnidadAutoService', () => {
  let service: UnidadAutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadAutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
