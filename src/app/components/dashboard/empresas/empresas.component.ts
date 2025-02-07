import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-empresas',
  imports: [MaterialModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {

  public dashBoardStore = inject(DashBoardStore);
  private messageDialogService = inject(MessageDialogService);
  public displayedColumns: string[] = ['clave', 'descripcion', 'validador', 'dvr', 'actions'];
  private modalService = inject(ModalsService);

  ngOnInit(): void {
    this.dashBoardStore.resetLasIdEmpresas();
    this.dashBoardStore.loadEmpresas();
  }



  public openModal(): void {
    this.modalService.openModal('empresa');
  }
  public async handlePageEvent(e: PageEvent) {
    const { pageSize } = e;
    this.dashBoardStore.resetLasIdEmpresas();
    await this.dashBoardStore.loadEmpresas(pageSize);
  }

  public edit(empresa: EmpresaDTO) {
    this.dashBoardStore.setSelectedEmpresa(empresa)
    this.modalService.openModal('empresa');
  }
  public async delete(id: number) {
    const confirmation = await this.messageDialogService.confirmationMessage('¿Estás seguro que desea eliminar este registro?');
    if (!confirmation) return;
    
    await this.dashBoardStore.deleteEmpresa(id);
    this.modalService.closeModal();
  }
}
