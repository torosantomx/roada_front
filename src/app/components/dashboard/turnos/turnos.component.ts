import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TablePaginatorComponent } from '@shared/components/table-paginator/table-paginator.component';
import { DateUtil } from '@shared/utils/date-util';
import { DashBoardStore } from '@store/bashboard/dash-board-store';


@Component({
  selector: 'app-turnos',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, NoDataComponent, TablePaginatorComponent, CommonModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {
  constructor() {
    this.date.valueChanges
      .subscribe(value =>
        this.dashBoardStore.loadTurnos(0,
          this.dashBoardStore.pagedTurnos.metadata().pageSize,
          value ? DateUtil.convertFromDateToString(value) : undefined
        )
      );
  }
  ngOnInit(): void {
    this.dashBoardStore.loadTurnos();
  }

  public clearDate(): void {
    this.date.setValue(undefined);
  }

  public displayedColumns: string[] = ['ruta', 'unidad', 'credencial', 'horaInicio', 'horaFin'];
  private modalsService = inject(ModalsService);
  public maxDate = DateUtil.yesterday;
  public date = new FormControl(undefined)
  public dashBoardStore = inject(DashBoardStore);
  private dialogService = inject(MessageDialogService);


  openModal() {
    this.modalsService.openModal('turnos');
  }

  handlePageEvent(event: PaginatorData) {
    const { pageSize, lastId } = event;
    this.dashBoardStore.loadTurnos(lastId, pageSize,)
  }

  async delete() {
    if (!this.date.value) return;
    if(this.dashBoardStore.pagedTurnos().metadata.totalCount == 0) return;
    const response = await this.dialogService.confirmationMessage('¿SEGURO QUE DESEA BORRAR TODOS LOS REGISTROS DE ESTA FECHA?')
    if (!response) return;
    await this.dashBoardStore.eraseTurnos(DateUtil.convertFromDateToString(this.date.value));
    this.date.setValue(undefined);
    await this.dashBoardStore.loadTurnos();
  }


}
