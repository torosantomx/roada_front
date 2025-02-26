import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CifrasControlDTO } from '@models/DTOs/cifras-control';

@Component({
  selector: 'app-estatus-icon',
  imports: [MatIconModule],
  templateUrl: './estatus-icon.component.html',
  styleUrl: './estatus-icon.component.scss'
})
export class EstatusIconComponent {
  public estatus = input.required<number>();
  public cifra = input.required<CifrasControlDTO>();

  public reProcess = output<CifrasControlDTO>();


  reProcessClicked(): void {
    this.reProcess.emit(this.cifra());
  }
}
