import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalsService } from '@services/modals.service';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import errores from './trayecto-ruta.json';
import { MaterialModule } from '@modules/material.module';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { NewTrayectoRuta } from '@models/types/new-trayecto-ruta';
import { TrayectoRutaDTO } from '@models/DTOs/trayectoRutaDTO';

@Component({
  selector: 'app-trayecto-ruta',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './trayecto-ruta.component.html',
  styleUrl: './trayecto-ruta.component.scss'
})
export class TrayectoRutaComponent extends FormComponent implements OnDestroy {
  constructor() {
    super();
    this.form = this.fb.group({
      clave: [this.dashBoardStore.selectedTrayectoRuta().clave ?? '', [Validators.required]],
      descripcion: [this.dashBoardStore.selectedTrayectoRuta().descripcion ?? '', [Validators.required]]
    });
    ErrorMessageHandle(this.clave, this.claveError, errores.errors.clave);
    ErrorMessageHandle(this.descripcion, this.descripcionError, errores.errors.descripcion);
  }

  public claveError = signal(errores.errors.clave.required);
  public descripcionError = signal(errores.errors.descripcion.required);

  public dashBoardStore = inject(DashBoardStore);
  private modalsService = inject(ModalsService);

  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedTrayectoRuta();
  }

  public async save() {
    if (this.form.invalid) return
    await this.dashBoardStore.saveTrayectoRuta(this.newTrayectoRuta);
    this.dashBoardStore.resetLasIdTrayectoRuta();
    this.dashBoardStore.loadTrayectoRutas('', this.dashBoardStore.trayectoRuta().metadata.pageSize);
    this.modalsService.closeModal();
  }

  public async update() {
    if (this.form.invalid) return
    await this.dashBoardStore.updateTrayectoRuta(this.trayectoRuta);
    this.modalsService.closeModal();
  }

  //#region Getters
  public get clave(): AbstractControl {
    return this.control('clave');
  }
  public get descripcion(): AbstractControl {
    return this.control('descripcion');
  }
  private get newTrayectoRuta(): NewTrayectoRuta {
    return this.form.value;
  }
  private get trayectoRuta(): TrayectoRutaDTO {
    return {
      ...this.form.value,
      id: this.dashBoardStore.selectedTrayectoRuta().id,
      estatus: this.dashBoardStore.selectedTrayectoRuta().estatus
    }
  }
  //#endregion

}
