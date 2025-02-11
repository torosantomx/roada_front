import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { EmpresaDTO } from '@models/DTOs/empresaDTO';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-empresas',
  imports: [MaterialModule, ReactiveFormsModule],
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
      this.dashBoardStore.loadEmpresas(this.searchValue)
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
  public async handlePageEvent(e: PageEvent) {
    const { pageSize } = e;
    this.dashBoardStore.resetLasIdEmpresas();
    await this.dashBoardStore.loadEmpresas(this.searchValue, pageSize);
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

    await this.dashBoardStore.deleteTrayectoRuta(id);
    this.modalService.closeModal();
  }

  private get searchValue(): string {
    return this.search.value ?? '';
  }
}
