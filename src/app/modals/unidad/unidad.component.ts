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
import { UnidadAutoService } from '@services/unidad-auto.service';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { checkIfUnidadExists } from '@validators/check-if-clave-exists';
import { checkIfEconomicoExisteInEmpresa } from '@validators/check-if-economico-exists-in-empresa';

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
      clave: [
        this.dashBoardStore.selectedAutoUnidad().clave ?? '',
        {
          validators: [Validators.required],
          asyncValidators: [
            this.dashBoardStore.isSelectedAutoUnidad() ?
              checkIfUnidadExists(this.unidadAutoService, this.dashBoardStore.selectedAutoUnidad().clave) :
              checkIfUnidadExists(this.unidadAutoService)
          ],
          updateOn: 'blur'
        }
      ],
      economico: [
        this.dashBoardStore.selectedAutoUnidad().economico ?? '',
        {
          validators: [Validators.required],
          asyncValidators: [
            this.dashBoardStore.isSelectedAutoUnidad() ?
              checkIfEconomicoExisteInEmpresa(this.unidadAutoService, this.idEmpresa, this.dashBoardStore.selectedAutoUnidad().economico) :
              checkIfEconomicoExisteInEmpresa(this.unidadAutoService, this.idEmpresa)
          ],
          updateOn: 'blur'
        }
      ],
      idEmpresa: [this.sessionService.empresa],
      idEquivalenciaUnidadValidador: [this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador ?? '', [Validators.required]],
      idEquivalenciaUnidadDrv: [this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadDrv ?? '', [Validators.required]]
    });

    ErrorMessageHandle(this.clave, this.claveError, errores.errors.clave);
    ErrorMessageHandle(this.economico, this.economicoError, errores.errors.economico);
    ErrorMessageHandle(this.idEquivalenciaUnidadDrv, this.idEquivalenciaUnidadDrvError, errores.errors.idEquivalenciaUnidadDrv);
    ErrorMessageHandle(this.idEquivalenciaUnidadValidador, this.idEquivalenciaUnidadValidadorError, errores.errors.idEquivalenciaUnidadValidador);
  }
  public dashBoardStore = inject(DashBoardStore);
  private modalsService = inject(ModalsService);
  private sessionService = inject(SessionService);
  private unidadAutoService = inject(UnidadAutoService)

  public claveError = signal(errores.errors.clave.required);
  public economicoError = signal(errores.errors.economico.required);
  public idEquivalenciaUnidadValidadorError = signal(errores.errors.idEquivalenciaUnidadValidador.required);
  public idEquivalenciaUnidadDrvError = signal(errores.errors.idEquivalenciaUnidadDrv.required);

  private idEmpresa: number = this.sessionService.empresa;

  ngOnInit(): void {
    this.dashBoardStore.getEquivalenciasUnidadValidadorUnassigned(this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador);
    this.dashBoardStore.getEquivalenciaUnidadDvrUnassigned(this.dashBoardStore.selectedAutoUnidad().idEquivalenciaUnidadValidador);
  }

  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedUnidadAuto();
  }

  public async update() {
    await this.dashBoardStore.updateUnidadAuto(this.unidadAuto);
    this.modalsService.closeModal();
  }
  async save() {
    if (this.form.invalid) return;
    await this.dashBoardStore.addUnidadAuto(this.newUnidadAuto);
    this.dashBoardStore.resetLasIdUnidadesAutos();
    await this.dashBoardStore.loadUnidadesAutosPagedByEmpresa('', this.dashBoardStore.unidadesAutos().metadata.pageSize);
    this.modalsService.closeModal();
  }
  //#region 
  public get clave(): AbstractControl {
    return this.control('clave');
  }
  public get economico(): AbstractControl {
    return this.control('economico');
  }
  public get idEquivalenciaUnidadValidador(): AbstractControl {
    return this.control('idEquivalenciaUnidadValidador');
  }
  public get idEquivalenciaUnidadDrv(): AbstractControl {
    return this.control('idEquivalenciaUnidadDrv');
  }
  private get unidadAuto(): UnidadAutoDTO {
    return {
      id: this.dashBoardStore.selectedAutoUnidad().id,
      ... this.form.value,
      idEmpresa: this.sessionService.empresa,
      estatus: this.dashBoardStore.selectedAutoUnidad().estatus
    };
  }

  private get newUnidadAuto(): NewUnidadAuto {
    return {
      ... this.form.value,
      economico: `${this.form.value.economico}`.toUpperCase(),
      idEmpresa: this.sessionService.empresa
    };
  }

  //#endregion
}
