import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { PaginatorData } from '@models/custom-entities/paginator-data';
import { UsuarioDTO } from '@models/DTOs/usuarioDTO';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { TablePaginatorComponent } from '@shared/components/table-paginator/table-paginator.component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, NoDataComponent, TablePaginatorComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  constructor() {
    this.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(environment.defaultDebounceTime)
    ).subscribe(_ => {
      this.dashBoardStore.resetLasIdUsuarios();
      this.dashBoardStore.loadUsuarios(this.searchValue)
    })
  }

  public dashBoardStore = inject(DashBoardStore);
  private messageDialogService = inject(MessageDialogService);
  public displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'nombreUsuario', 'actions'];
  public search = new FormControl('');
  private modalService = inject(ModalsService);

  ngOnInit(): void {
    this.dashBoardStore.loadUsuarios();
  }

  public async delete(id: number) {
    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;
    this.dashBoardStore.deleteUsuario(id);
    this.modalService.closeModal();
  }
  public openModal(): void {
    this.modalService.openModal('usuario');
  }
  public edit(usuario: UsuarioDTO) {
    this.dashBoardStore.setSelectedUsuario(usuario);
    this.modalService.openModal('admin-usuarios');
  }
  public async handlePageEvent(e: PaginatorData) {
    const { pageSize, lastId } = e;
    await this.dashBoardStore.loadUsuarios('', pageSize, lastId);
  }

  public clearSearch(): void {
    this.search.setValue('');
  }

  private get searchValue(): string {
    return this.search.value ?? '';
  }
}
