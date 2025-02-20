import { Component } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';

@Component({
  selector: 'app-admin-usuarios',
  imports: [ModalHeaderComponent, MaterialModule, CambioClaveComponent],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.scss'
})
export class AdminUsuariosComponent {

}
