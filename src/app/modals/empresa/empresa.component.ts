import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { FormComponent } from '@shared/utils/form-component';
import errores from './empresas.json';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { ModalsService } from '@services/modals.service';
import { NewEmpresa } from '@models/types/new-empresa';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';

@Component({
  selector: 'app-empresa',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent extends FormComponent implements OnInit, OnDestroy {
  constructor() {
    super();
    this.form = this.fb.group({
      clave: [this.dashBoardStore.selectedEmpresa().clave ?? '', [Validators.required]],
      descripcion: [this.dashBoardStore.selectedEmpresa().descripcion ?? '', [Validators.required]],
      idValidador: [this.dashBoardStore.selectedEmpresa().idValidador ?? '', [Validators.required]],
      idDvr: [this.dashBoardStore.selectedEmpresa().idDvr ?? '', [Validators.required]]
    });
    ErrorMessageHandle(this.clave, this.claveError, errores.errors.clave);
    ErrorMessageHandle(this.descripcion, this.descripcionError, errores.errors.descripcion);
    ErrorMessageHandle(this.idValidador, this.idValidadorError, errores.errors.idValidador);
    ErrorMessageHandle(this.idDvr, this.idDvrError, errores.errors.idDvr);
  }

  //#region Properties
  public claveError = signal(errores.errors.clave.required);
  public descripcionError = signal(errores.errors.descripcion.required);
  public idValidadorError = signal(errores.errors.idValidador.required);
  public idDvrError = signal(errores.errors.idDvr.required);
  public dashBoardStore = inject(DashBoardStore);
  private modalsService = inject(ModalsService);
  //#endregion

  //#region Methods
  ngOnInit(): void {
    this.dashBoardStore.loadVDRUnassigned(this.dashBoardStore.selectedEmpresa().idDvr);
    this.dashBoardStore.loadValidacionesUnsassined(this.dashBoardStore.selectedEmpresa().idValidador);
  }
  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedEmpresa();
  }

  public async save() {
    if (this.form.invalid) return
    this.dashBoardStore.saveEmpresa(this.newEmpresa);
    this.dashBoardStore.resetLasIdEmpresas();
    this.dashBoardStore.loadEmpresas('', this.dashBoardStore.pagedEmpresas().metadata.pageSize);
    this.modalsService.closeModal();
  }

  public async update() {
    if (this.form.invalid) return
    await this.dashBoardStore.updateEmpresa(this.empresa);
    this.modalsService.closeModal();
  }
  //#endregion
  //#region Getters
  public get clave(): AbstractControl {
    return this.control('clave');
  }
  public get descripcion(): AbstractControl {
    return this.control('descripcion');
  }
  public get idValidador(): AbstractControl {
    return this.control('idValidador');
  }
  public get idDvr(): AbstractControl {
    return this.control('idDvr');
  }
  private get newEmpresa(): NewEmpresa {
    return this.form.value;
  }
  private get empresa(): EmpresaDTO {
    return {
      ...this.form.value,
      id: this.dashBoardStore.selectedEmpresa.id()
    }
  }
  //#endregion
}
