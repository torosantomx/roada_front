import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from '../modals/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  protected dialogRef!: MatDialogRef<LoadingComponent, unknown>;
  protected dialog: MatDialog = inject(MatDialog)
  protected config: MatDialogConfig = {
    disableClose: true,
  }

  showLoadingScreen() {
    this.dialogRef = this.dialog.open(LoadingComponent, this.config)
  }
  closeModal() {
    this.dialogRef.close();
  }
}
