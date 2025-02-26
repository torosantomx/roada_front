import { DatePipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { TurnosFromExcel } from '@models/custom-entities/turnos-from-excel';
import { TurnoDTO } from '@models/DTOs/turnoDTO';
import { NewTurno } from '@models/types/new-turno';
import { MaterialModule } from '@modules/material.module';
import { GenerateExcelFileService } from '@services/generate-excel-file.service';
import { MessageDialogService } from '@services/message-dialog.service';
import { ModalsService } from '@services/modals.service';
import { SessionService } from '@services/session.service';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { DateUtil } from '@shared/utils/date-util';
import { ExcelExplorer } from '@shared/utils/excel-explorer';
import { formatTime } from '@shared/utils/hour-util';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-turnos',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule, DatePipe],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent implements OnInit {
  async ngOnInit() {
    await this.dashBoardStore.getClavesRutasByEmpresa();
    await this.dashBoardStore.getUnidadesByEmpresa();
  }

  public gettingData = signal<boolean>(false);
  private generateExcelFile = inject(GenerateExcelFileService);
  private turnosFromExcel = signal<Array<TurnosFromExcel>>([]);
  private dashBoardStore = inject(DashBoardStore);
  public date = new FormControl(DateUtil.yesterday, Validators.required);
  public maxDate = DateUtil.yesterday;
  private sessionService = inject(SessionService);
  private modalsService = inject(ModalsService);
  private messageDialog = inject(MessageDialogService)

  public incompletedRows = computed(() => {
    return this.turnosFromExcel().filter(item => Object.values(item).some(value => value == null))
  });

  public wrongRows = computed(() => {
    return this.turnosFromExcel().filter((item) =>
      !this.dashBoardStore.clavesRutas().has(item.ruta) ||
      !this.dashBoardStore.economicos().has(item.economico) ||
      item.turno <= 0 || item.turno >= 4 ||
      this.horaHasTheInCorrectFormat(item) ||
      ((item.turno == 1 || item.turno == 2) && this.horaTurnosMatutitnosIsWrong(item))
    )
  });

  public correctRows = computed(() => {
    if (this.thereAreIncompletedRows() || this.thereAreWrongRows()) return []

    const rows = this.turnosFromExcel().map(t => {
      const turno: NewTurno = {
        idEmpresa: this.sessionService.empresa,
        idUnidad: this.dashBoardStore.unidadesMap().get(t.economico)!,
        idRuta: this.dashBoardStore.clavesRutasMap().get(t.ruta)!,
        fecha: DateUtil.convertFromDateToString(this.date.value!),
        clasificacionTurno: t.turno,
        horaInicio: formatTime(t.hora_inicio, t.minutos_inicio),
        horaFin: formatTime(t.hora_fin, t.minutos_fin),
        credencial: t.credencial,
        unidad: t.economico,
        ruta: t.ruta,
      }
      return turno;
    })
    return rows
  })

  public thereAreIncompletedRows = computed(() => this.incompletedRows().length > 0);
  public thereAreWrongRows = computed(() => this.wrongRows().length > 0);
  public rowsAreCorrect = computed(() => this.correctRows().length > 0)

  public displayedColumns: string[] = ['economico', 'ruta', 'turno', 'horaInicio', 'minutosInicio', 'horaFin', 'minutosFin', 'credencial'];

  public displayedColumnsCorrectRows: string[] = ['economico', 'ruta', 'turno', 'horaInicio', 'horaFin', 'credencial'];

  public async getData() {
    this.gettingData.set(false);
    const turnos = await ExcelExplorer.SelectExcel();
    this.gettingData.set(true);

    if (!turnos[0]?.economico) return;
    this.turnosFromExcel.set([...turnos]);
  }
  public dowloadFile() {
    this.generateExcelFile.generateAndDownloadExcel(["ECONOMICO", "RUTA", "TURNO", "HORA_INICIO", "MINUTOS_INICIO", "HORA_FIN", "MINUTOS_FIN", "CREDENCIAL"], "turnos");
  }


  private horaHasTheInCorrectFormat(item: TurnosFromExcel) {
    return item.hora_inicio < 0 ||
      item.hora_inicio > 23 ||
      item.hora_fin < 0 ||
      item.hora_fin > 23 ||
      item.minutos_inicio < 0 ||
      item.minutos_inicio > 60 ||
      item.minutos_fin < 0 ||
      item.minutos_fin > 60;
  }

  public horaTurnosMatutitnosIsWrong(item: TurnosFromExcel) {
    const inicio = item.hora_inicio * 60 + item.minutos_inicio;
    const fin = item.hora_fin * 60 + item.minutos_fin;
    return inicio > fin;
  }

  async save() {
    const response = await this.messageDialog.confirmationMessage(environment.defaultDeleteMessage);
    if (!response) return;
    await this.dashBoardStore.createTurnos(this.correctRows());
    await this.dashBoardStore.loadTurnos();
    this.modalsService.closeModal();
  }


}
