import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayectoRutaComponent } from './trayecto-ruta.component';

describe('TrayectoRutaComponent', () => {
  let component: TrayectoRutaComponent;
  let fixture: ComponentFixture<TrayectoRutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrayectoRutaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrayectoRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
