import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ModalsService } from '@services/modals.service';
import { SessionService } from '@services/session.service';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import errores from './unidad.json';
import { NewUnidadAuto } from '@models/types/new-unidad-auto';
import { UnidadAutoDTO } from '@models/DTOs/unidad-auto';

@Component({
  selector: 'app-unidad',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.scss'
})
export class UnidadComponent extends FormComponent implements OnInit, OnDestroy {


  constructor() {
    super();

    this.form = this.fb.group({
      clave: [this.dashBoardStore.selectedAutoUnidad().clave ?? '', [Validators.required]],
      economico: [this.dashBoardStore.selectedAutoUnidad().economico ?? '', [Validators.required]],
      idEmpresa: [this.sessionService.empresa],
      idEquivalenciaUnidadValidador: [this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador ?? '', [Validators.required]],
      idEquivalenciaUnidadDrv: [this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadDrv ?? '', [Validators.required]]
    });

  }
  public dashBoardStore = inject(DashBoardStore);
  private modalsService = inject(ModalsService);
  private sessionService = inject(SessionService);

  public claveError = signal(errores.errors.clave.required);
  public economicoError = signal(errores.errors.economico.required);
  public idValidadorError = signal(errores.errors.idValidador.required);
  public idDvrError = signal(errores.errors.idDvr.required);

  private idEmpresa: number = this.sessionService.empresa;

  ngOnInit(): void {
    this.dashBoardStore.getEquivalenciasUnidadValidadorUnassigned(this.idEmpresa, this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador);
    this.dashBoardStore.getEquivalenciaUnidadDvrUnassigned(this.idEmpresa, this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador);
  }

  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedUnidadAuto();
  }

  public async update() {
    await this.dashBoardStore.updateUnidadAuto(this.unidadAuto);
    this.modalsService.closeModal();
  }
  async save() {
    await this.dashBoardStore.addUnidadAuto(this.newUnidadAuto);
  }
  //#region 
  public get clave(): AbstractControl {
    return this.control('clave');
  }
  public get economico(): AbstractControl {
    return this.control('economico');
  }
  public get idValidador(): AbstractControl {
    return this.control('idEquivalenciaUnidadValidador');
  }
  public get idDvr(): AbstractControl {
    return this.control('idEquivalenciaUnidadDrv');
  }
  private get unidadAuto(): UnidadAutoDTO {
    return {
      id: this.dashBoardStore.selectedAutoUnidad().id,
      ... this.form.value,
      idEmpresa: this.sessionService.empresa
    };
  }

  private get newUnidadAuto(): NewUnidadAuto {
    return {
      ... this.form.value,
      idEmpresa: this.sessionService.empresa
    };
  }

  //#endregion
}
