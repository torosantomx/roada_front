import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MaterialModule } from '@modules/material.module';

@Component({
  selector: 'app-confirmation',
  imports: [MaterialModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, UpperCasePipe],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {

  readonly message = inject<string>(MAT_DIALOG_DATA);

}
