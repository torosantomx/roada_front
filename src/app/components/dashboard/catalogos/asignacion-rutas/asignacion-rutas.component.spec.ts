import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionRutasComponent } from './asignacion-rutas.component';

describe('AsignacionRutasComponent', () => {
  let component: AsignacionRutasComponent;
  let fixture: ComponentFixture<AsignacionRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionRutasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
