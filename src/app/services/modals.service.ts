import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AdminUsuariosComponent } from '@modals/admin-usuarios/admin-usuarios.component';
import { AsignacionRutasComponent } from '@modals/asignacion-rutas/asignacion-rutas.component';
import { CargaUnidadesComponent } from '@modals/carga-unidades/carga-unidades.component';
import { EmpresaComponent } from '@modals/empresa/empresa.component';
import { SessionInfoComponent } from '@modals/session-info/session-info.component';
import { TrayectoRutaComponent } from '@modals/trayecto-ruta/trayecto-ruta.component';
import { TurnosComponent } from '@modals/turnos/turnos.component';
import { UnidadComponent } from '@modals/unidad/unidad.component';
import { UsuariosComponent } from '@modals/usuarios/usuarios.component';
import { LateralModalsKeys } from '@shared/keys/modal-keys';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private dialog: MatDialog = inject(MatDialog)
  private modals: Array<MatDialogRef<unknown>> = new Array<MatDialogRef<unknown>>();

  private config: MatDialogConfig = {
    disableClose: true,
    position: {
      top: '0',
      right: '0',
    },
    panelClass: 'modal-lateral',
  }

  public openModal(modal: LateralModalsKeys): void {
    switch (modal) {
      case 'empresa':
        this.open(EmpresaComponent);
        break;
      case 'trayectoRuta':
        this.open(TrayectoRutaComponent);
        break;
      case 'unidad':
        this.open(UnidadComponent)
        break;
      case 'cargarUnidades':
        this.open(CargaUnidadesComponent)
        break;
      case 'asignacion-rutas':
        this.open(AsignacionRutasComponent)
        break;
      case 'admin-usuarios':
        this.open(AdminUsuariosComponent)
        break;
      case 'usuario':
        this.open(UsuariosComponent)
        break;
      case 'turnos':
        this.open(TurnosComponent)
        break;
    }
  }

  public openSessionInfoModal(): void {
    const modal = this.dialog.open(SessionInfoComponent);
    this.modals.push(modal);
  }

  private open(componente: ComponentType<unknown>) {
    const dialog = this.dialog.open(componente, this.config);
    this.modals.push(dialog);
  }

  public closeModal(): void {
    const modal = this.modals.pop();
    if (modal)
      modal.close();
  }

  public closeAllModals(): void {
    this.modals.forEach(modal => modal.close());
    this.modals = [];
  }
}
