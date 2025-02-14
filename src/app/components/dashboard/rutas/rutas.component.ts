import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';
import { TrayectoRutaDTO } from '@models/DTOs/trayectoRutaDTO';
import { MaterialModule } from '@modules/material.module';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-rutas',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe, CommonModule],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.scss'
})
export class RutasComponent implements OnInit, OnDestroy {
  constructor() {
    this.search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(environment.defaultDebounceTime)
    ).subscribe(_ => {
      this.dashBoardStore.resetLasIdTrayectoRuta();
      this.dashBoardStore.loadTrayectoRutas(this.searchValue)
    })
  }

  public dashBoardStore = inject(DashBoardStore);
  private messageDialogService = inject(MessageDialogService);
  public displayedColumns: string[] = ['clave', 'descripcion', 'actions'];
  public search = new FormControl('');
  private modalService = inject(ModalsService);

  ngOnDestroy(): void {
    this.dashBoardStore.resetLasIdTrayectoRuta();
  }
  ngOnInit(): void {
    this.dashBoardStore.loadTrayectoRutas();
  }
  public openModal(): void {
    this.modalService.openModal('trayectoRuta');
  }
  public async handlePageEvent(e: PageEvent) {
    const { pageSize } = e;
    this.dashBoardStore.resetLasIdTrayectoRuta();
    await this.dashBoardStore.loadTrayectoRutas(this.searchValue, pageSize);
  }

  public clearSearch(): void {
    this.search.setValue('');
  }

  public edit(trayectoRuta: TrayectoRutaDTO) {
    this.dashBoardStore.setSelectedTracyectoRuta(trayectoRuta)
    this.modalService.openModal('trayectoRuta');
  }
  public async delete(trayecto: TrayectoRutaDTO) {
    if (!trayecto.asignado) return;

    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;

    await this.dashBoardStore.deleteTrayectoRuta(trayecto.id);
    this.modalService.closeModal();
  }

  private get searchValue(): string {
    return this.search.value ?? '';
  }
}
