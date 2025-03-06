import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewRutaEmpresa } from '@models/types/new-ruta-empresa';
import { MaterialModule } from '@modules/material.module';
import { ModalsService } from '@services/modals.service';
import { SessionService } from '@services/session.service';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-asignacion-rutas',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './asignacion-rutas.component.html',
  styleUrl: './asignacion-rutas.component.scss'
})
export class AsignacionRutasComponent extends FormComponent implements OnInit {

  constructor() {
    super();

    const empresa = this.sessionService.usuario?.empresas.find(e => e.id == this.sessionService.empresa);
    const name = `${empresa?.clave} ${empresa?.descripcion}`
    this.form = this.fb.group({
      empresa: [{ value: name, disabled: true }],
      idEmpresa: [this.sessionService.empresa, [Validators.required]],
      idRuta: ['', [Validators.required]],
    });
  }
  public dashBoardStore = inject(DashBoardStore);
  private sessionService = inject(SessionService);
  private modalService = inject(ModalsService)

  ngOnInit(): void {
    this.dashBoardStore.getUnassignedRutasByEmpresa();
  }
  public save() {
    if (this.form.invalid) return;

    this.dashBoardStore.saveRutaEmpresa(this.rutaEmpresa);
    this.dashBoardStore.resetLasIdRutasEmpresa();
    this.dashBoardStore.getRutasEmpresaByEmpresa();
    this.modalService.closeModal();
  }


  public get idRuta(): AbstractControl {
    return this.control('idRuta');
  }

  public get rutaEmpresa(): NewRutaEmpresa {
    const data = this.form.value;
    delete data.empresa;
    return data;
  }
  // RutaEmpresaController
}
