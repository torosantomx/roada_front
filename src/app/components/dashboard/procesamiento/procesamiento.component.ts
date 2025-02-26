import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { ActualComponent } from './actual/actual.component';
import { HistoricoComponent } from './historico/historico.component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { DateUtil } from '@shared/utils/date-util';

@Component({
  selector: 'app-procesamiento',
  imports: [MaterialModule, ActualComponent, HistoricoComponent],
  templateUrl: './procesamiento.component.html',
  styleUrl: './procesamiento.component.scss'
})
export class ProcesamientoComponent implements OnInit {
  ngOnInit(): void {
    this.dashBoardStore.loadProcesosPagedByEmpresa(DateUtil.getPreviousDate());
  }

  private dashBoardStore = inject(DashBoardStore);
  
  
  tabChange(index: number) {
  }

}
