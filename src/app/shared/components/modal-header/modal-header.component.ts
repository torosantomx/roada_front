import { UpperCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { ModalsService } from '@services/modals.service';

@Component({
  selector: 'app-modal-header',
  imports: [MaterialModule, UpperCasePipe],
  templateUrl: './modal-header.component.html',
  styleUrl: './modal-header.component.scss'
})
export class ModalHeaderComponent {
  private modalsService = inject(ModalsService);

  public header = input<string>();

  public close() {
    this.modalsService.closeModal();
  }
}
