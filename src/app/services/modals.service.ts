import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmpresaComponent } from '@modals/empresa/empresa.component';
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
      }
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
}
