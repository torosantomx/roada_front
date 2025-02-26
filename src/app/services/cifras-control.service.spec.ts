import { TestBed } from '@angular/core/testing';

import { CifrasControlService } from './cifras-control.service';

describe('CifrasControlService', () => {
  let service: CifrasControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CifrasControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
