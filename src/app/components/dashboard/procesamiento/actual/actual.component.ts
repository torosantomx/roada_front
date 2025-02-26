import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MaterialModule } from '@modules/material.module';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { DateUtil } from '@shared/utils/date-util';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-actual',
  imports: [NoDataComponent, MaterialModule, UpperCasePipe],
  templateUrl: './actual.component.html',
  styleUrl: './actual.component.scss'
})
export class ActualComponent implements OnDestroy {

  public dashBoardStore = inject(DashBoardStore);
  public displayedColumns: string[] = ['nombre', 'proceso', 'fecha', 'check'];

  ngOnDestroy(): void {
   this.dashBoardStore.resetLastIdTodayProcesos();
  }
  handlePageEvent(event: PageEvent) {
    const { pageSize } = event;
    // this.dashBoardStore.loadProcesosPagedByEmpresa(undefined, undefined, 0, pageSize);
  }
  public get date(): string {
    return DateUtil.getPreviousDateDDMMYYY();
  }
}
