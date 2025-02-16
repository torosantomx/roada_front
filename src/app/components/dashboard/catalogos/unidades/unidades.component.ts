import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { UnidadAutoDTO } from '@models/DTOs/unidad-auto';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { ExcelExplorer } from '@shared/utils/excel-explorer';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-unidades',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss'
})
export class UnidadesComponent implements OnInit {
  constructor() {
    this.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(environment.defaultDebounceTime)
    ).subscribe(_ => {
      this.dashBoardStore.resetLasIdUnidadesAutos();
      this.dashBoardStore.loadUnidadesAutosPagedByEmpresa(this.searchValue)
    })
  }
  public search = new FormControl('');
  public displayedColumns: string[] = ['clave', 'economico', 'dvr', 'validador', 'actions'];
  public dashBoardStore = inject(DashBoardStore);
  private modalsServive = inject(ModalsService);
  private messageDialogService = inject(MessageDialogService);

  //#region Methods
  ngOnInit() {
    // this.loadFile();
    this.dashBoardStore.loadUnidadesAutosPagedByEmpresa();
  }

  ngOnDestroy(): void {
    this.dashBoardStore.resetLasIdUnidadesAutos();
  }

  public async handlePageEvent(e: PageEvent) {
    const { pageSize } = e;
    this.dashBoardStore.resetLasIdUnidadesAutos();
    await this.dashBoardStore.loadUnidadesAutosPagedByEmpresa(this.searchValue, pageSize);
  }

  public async delete(id: number) {
    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;

    await this.dashBoardStore.deleteUnidadAuto(id);
    this.modalsServive.closeModal();
  }

  public edit(unidadAuto: UnidadAutoDTO) {
    this.dashBoardStore.setSelectedUnidadAuto(unidadAuto)
    this.modalsServive.openModal('unidad');
  }

  public clearSearch() {
    this.search.setValue('');
  }

  public openModal() {
    this.modalsServive.openModal('unidad');
  }

  public loadFile() {
    this.modalsServive.openModal('cargarUnidades');
  }

  //#endregion

  //#region Getters
  private get searchValue(): string {
    return this.search.value ?? '';
  }
  //#endregion

}
