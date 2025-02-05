import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { MaterialModule } from '@modules/material.module';
import { ModalsService } from '@services/modals.service';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-empresas',
  imports: [MaterialModule],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {

  public dashBoardStore = inject(DashBoardStore)
  public displayedColumns: string[] = ['clave', 'nombreDes', 'linea', 'parentFleet', 'actions'];
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
    await this.dashBoardStore.deleteEmpresa(id);
    this.modalService.closeModal();
  }
}
