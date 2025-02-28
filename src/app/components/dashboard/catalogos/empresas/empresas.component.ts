import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environments/environment';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TablePaginatorComponent } from '@shared/components/table-paginator/table-paginator.component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-empresas',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, NoDataComponent, TablePaginatorComponent],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
export class EmpresasComponent implements OnInit {
  constructor() {
    this.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(environment.defaultDebounceTime)
    ).subscribe(_ => {
      this.dashBoardStore.resetLasIdEmpresas();
      this.dashBoardStore.loadEmpresas(this.searchValue, this.dashBoardStore.pagedEmpresas().metadata.pageSize)
    })
  }

  public dashBoardStore = inject(DashBoardStore);
  private messageDialogService = inject(MessageDialogService);
  public displayedColumns: string[] = ['clave', 'descripcion', 'validador', 'dvr', 'actions'];
  public search = new FormControl('');
  private modalService = inject(ModalsService);

  ngOnInit(): void {
    this.dashBoardStore.resetLasIdEmpresas();
    this.dashBoardStore.loadEmpresas();
  }

  public openModal(): void {
    this.modalService.openModal('empresa');
  }
  public async handlePageEvent(e: PaginatorData) {
    const { pageSize, lastId } = e;
    await this.dashBoardStore.loadEmpresas(this.searchValue, pageSize, lastId);
  }

  public clearSearch(): void {
    this.search.setValue('');
  }

  public edit(empresa: EmpresaDTO) {
    this.dashBoardStore.setSelectedEmpresa(empresa)
    this.modalService.openModal('empresa');
  }
  public async delete(id: number) {
    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;

    await this.dashBoardStore.deleteEmpresa(id);
    this.modalService.closeModal();
  }

  private get searchValue(): string {
    return this.search.value ?? '';
  }
}
