import { Component, inject, OnDestroy, signal } from '@angular/core';
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
export class EmpresaComponent extends FormComponent implements OnDestroy {
  constructor() {
    super();
    this.form = this.fb.group({
      clave: [this.dashBoardStore.selectedEmpresa.clave() ?? '', [Validators.required]],
      nombreDes: [this.dashBoardStore.selectedEmpresa.nombreDes() ?? '', [Validators.required]],
      linea: [this.dashBoardStore.selectedEmpresa.linea() ?? '', [Validators.required]],
      parentFleet: [this.dashBoardStore.selectedEmpresa.parentFleet() ?? '', [Validators.required]]
    });
    ErrorMessageHandle(this.clave, this.claveError, errores.errors.clave);
    ErrorMessageHandle(this.nombreDes, this.nombreDesError, errores.errors.nombreDes);
    ErrorMessageHandle(this.linea, this.lineaError, errores.errors.linea);
    ErrorMessageHandle(this.parentFleet, this.parentFleetError, errores.errors.parentFleet);
  }

  //#region Properties
  public claveError = signal(errores.errors.clave.required);
  public nombreDesError = signal(errores.errors.nombreDes.required);
  public lineaError = signal(errores.errors.linea.required);
  public parentFleetError = signal(errores.errors.parentFleet.required);
  public dashBoardStore = inject(DashBoardStore);
  private modalsService = inject(ModalsService);
  //#endregion

  //#region Methods
  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedEmpresa();
  }

  public async save() {
    if (this.form.invalid) return
    await this.dashBoardStore.saveEmpresa(this.newEmpresa);
    this.dashBoardStore.resetLasIdEmpresas();
    await this.dashBoardStore.loadEmpresas(this.dashBoardStore.pageSizeEmpresas());
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
  public get nombreDes(): AbstractControl {
    return this.control('nombreDes');
  }
  public get linea(): AbstractControl {
    return this.control('linea');
  }
  public get parentFleet(): AbstractControl {
    return this.control('parentFleet');
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
