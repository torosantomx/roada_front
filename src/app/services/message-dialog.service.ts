import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '@modals/confirmation/confirmation.component';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {

  private dialog: MatDialog = inject(MatDialog)
  private config: MatDialogConfig = {
    disableClose: true,
  }
  protected dialogRef!: MatDialogRef<ConfirmationComponent, unknown>;

  async confirmationMessage(message: string): Promise<boolean> {
    this.dialogRef = this.dialog.open(ConfirmationComponent, { ... this.config, data: message });
    return await lastValueFrom(this.dialogRef.afterClosed() as Observable<boolean>);
  }

  // ConfirmationComponent
}
