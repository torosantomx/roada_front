import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ModalsService } from '@services/modals.service';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-cambio-clave',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './cambio-clave.component.html',
  styleUrl: './cambio-clave.component.scss'
})
export class CambioClaveComponent {


  public hide = signal(true);

  private modalsService = inject(ModalsService);
  private dashBoradStore = inject(DashBoardStore);
  public clave = new FormControl('', Validators.required)

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  public change() {
    if (this.clave.invalid) return;
    this.dashBoradStore.changePassword(this.clave.value!);
    this.modalsService.closeModal();
  }

}
