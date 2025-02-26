import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusIconComponent } from './estatus-icon.component';

describe('EstatusIconComponent', () => {
  let component: EstatusIconComponent;
  let fixture: ComponentFixture<EstatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatusIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
