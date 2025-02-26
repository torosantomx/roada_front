import { Component, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { CustomPaginator } from '@shared/utils/custom-paginator';

@Component({
  selector: 'app-table-paginator',
  imports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
  templateUrl: './table-paginator.component.html',
  styleUrl: './table-paginator.component.scss'
})
export class TablePaginatorComponent {

  constructor() {
    this.lastIdHistory.set(0, 0)
  }
  private defaultLastId = environment.pagination.defaultLastId;
  private curentPageSize = environment.pagination.defaultPageSize;

  private lastPage = 0;
  private lastIdUsed = 0;

  private lastIdHistory = new Map<number, number>();
  public pageChanged = output<PaginatorData>();

  public length = input.required<number>();
  public lastId = input.required<number>();

  hasChange(event: PageEvent) {
    const { pageSize, pageIndex } = event;

    if (pageSize !== this.curentPageSize) {
      this.curentPageSize = pageSize;
      this.lastIdHistory.clear();
      this.lastIdHistory.set(0, 0)
      this.pageChanged.emit({ lastId: this.defaultLastId, pageSize });
      return;
    }

    if (pageIndex > this.lastPage) {
      this.lastIdHistory.set(pageIndex, this.lastId());
      this.pageChanged.emit({ lastId: this.lastId(), pageSize });
    }
    else if (pageIndex < this.lastPage){
      const previousId = this.lastIdHistory.get(pageIndex);
      this.lastIdUsed = this.lastId();
      this.pageChanged.emit({ lastId: previousId !== undefined ? previousId : 0, pageSize });
    }

    this.lastPage = pageIndex;
  }

}
