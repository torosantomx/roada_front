import { TestBed } from '@angular/core/testing';

import { GenerateExcelFileService } from './generate-excel-file.service';

describe('GenerateExcelFileService', () => {
  let service: GenerateExcelFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateExcelFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
