import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { CifrasControlDTO } from '@models/DTOs/cifras-control';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { EstatusIconComponent } from '@shared/components/estatus-icon/estatus-icon.component';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TablePaginatorComponent } from '@shared/components/table-paginator/table-paginator.component';
import { DateUtil } from '@shared/utils/date-util';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { merge } from 'rxjs';

@Component({
  selector: 'app-historico',
  imports: [MaterialModule, ReactiveFormsModule, NoDataComponent, UpperCasePipe, TablePaginatorComponent, EstatusIconComponent],
  providers: [],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent extends FormComponent implements OnInit {
  constructor() {
    super();
    this.form = this.fb.group({
      fecha: [null],
      idProceso: [null]
    });

    merge(
      this.idProceso.valueChanges,
      this.fecha.valueChanges
    ).subscribe(_ => {
      // this.dashBoardStore.setFechaProcesos(this.fecha.value);
      // this.dashBoardStore.setIdProceso(this.idProceso.value);
      this.loadHistory(0, this.dashBoardStore.historyProcesos().metadata.pageSize)
    });
  }

  public dashBoardStore = inject(DashBoardStore);
  public displayedColumns: string[] = ['nombre', 'proceso', 'fecha', 'actions'];
  private messageDialogService = inject(MessageDialogService);
  private modalsService = inject(ModalsService);

  readonly maxDate = new Date();

  ngOnInit(): void {
    this.dashBoardStore.loadProcesos();
    this.dashBoardStore.loadProcesosHistoryByEmpresa();
  }

  handlePageEvent(event: PaginatorData) {
    const { pageSize, lastId } = event;
    this.loadHistory(lastId, pageSize);
  }

  private loadHistory(lastId: number, pageZise: number): void {
    this.dashBoardStore.loadProcesosHistoryByEmpresa(
      lastId,
      pageZise,
      this.idProceso.value,
      this.fechaSelected
    )
  }

  public async reProcess(cifra: CifrasControlDTO) {
    const response = await this.messageDialogService.confirmationMessage('¿seguro que desea re procesar esta fecha?');
    if (!response) return;
    const updatedCifra = {
      ...cifra,
      estatusCarga: 4,
      estatusProcesamiento: 4
    }
    await this.dashBoardStore.reprocess(updatedCifra);
    this.modalsService.closeModal();
  }

  public clearFecha(event: MouseEvent): void {
    event.stopPropagation();
    this.fecha.setValue(null);
  }


  public clearIdProcesos(event: MouseEvent): void {
    event.stopPropagation();
    this.idProceso.setValue(null);
  }

  public get idProceso(): AbstractControl {
    return this.control('idProceso');
  }

  public get fecha(): AbstractControl {
    return this.control('fecha');
  }

  public get fechaSelected(): string | undefined {
    if (!this.fecha.value) return undefined;

    return DateUtil.convertFromDateToString(this.fecha.value);
  }

}
