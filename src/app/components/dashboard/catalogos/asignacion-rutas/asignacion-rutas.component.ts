import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TablePaginatorComponent } from '@shared/components/table-paginator/table-paginator.component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-asignacion-rutas',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, NoDataComponent, TablePaginatorComponent],
  templateUrl: './asignacion-rutas.component.html',
  styleUrl: './asignacion-rutas.component.scss'
})
export class AsignacionRutasComponent implements OnInit {
  private messageDialogService = inject(MessageDialogService);
  private modalsService = inject(ModalsService);
  public displayedColumns: string[] = ['claveTrayectoRuta', 'descripcionTrayectoRuta', 'actions'];
  public dashBoardStore = inject(DashBoardStore);

  ngOnInit(): void {
    this.dashBoardStore.resetLasIdTrayectoRuta();
    this.dashBoardStore.getRutasEmpresaByEmpresa();
  }

  async delete(id: number) {
    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;
    await this.dashBoardStore.deleteRutaEmpresa(id);
  }

  openModal() {
    this.modalsService.openModal('asignacion-rutas');
  }

  handlePageEvent(e: PaginatorData) {
    const { pageSize, lastId } = e;
    this.dashBoardStore.getRutasEmpresaByEmpresa(pageSize, lastId);

  }
}
