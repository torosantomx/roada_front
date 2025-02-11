import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaUnidadesComponent } from './carga-unidades.component';

describe('CargaUnidadesComponent', () => {
  let component: CargaUnidadesComponent;
  let fixture: ComponentFixture<CargaUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaUnidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
