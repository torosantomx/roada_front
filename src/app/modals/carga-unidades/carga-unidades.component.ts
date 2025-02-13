import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, computed, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { ExcelExplorer } from '@shared/utils/excel-explorer';
import { UnidadesFromExcel } from '@models/custom-entities/unidades-from-excel';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import { GenerateExcelFileService } from '@services/generate-excel-file.service';
import { MatAccordion } from '@angular/material/expansion';
import { SessionService } from '@services/session.service';
import json from './carga-unidades.json';
import { isValueTaken } from '@validators/value-is-taken';
import { MessageDialogService } from '@services/message-dialog.service';
import { environment } from '@environments/environment';
import { NewUnidadAuto } from '@models/types/new-unidad-auto';
import { ModalsService } from '@services/modals.service';

@Component({
  selector: 'app-carga-unidades',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './carga-unidades.component.html',
  styleUrl: './carga-unidades.component.scss'
})
export class CargaUnidadesComponent implements OnInit {
  constructor() {
  }
  private generateExcelFile = inject(GenerateExcelFileService);
  private fb = inject(FormBuilder);

  public dashBoardStore = inject(DashBoardStore);
  private sessionService = inject(SessionService);
  public gettingData = signal<boolean>(false);
  public messageDialogService = inject(MessageDialogService);
  public unidadesFromExcel = signal<Array<UnidadesFromExcel>>([]);
  private modalsService = inject(ModalsService);

  public duplicatedRowsInDB = computed(() => (
    this.unidadesFromExcel().filter(u => {
      const existingClaveInDb = this.dashBoardStore.claves().has(u.clave);
      const existingEconomicoInDb = this.dashBoardStore.economicos().has(u.economico);
      return existingClaveInDb || existingEconomicoInDb;
    })
  ));


  public duplicatedRowsInLocal = computed(() => {
    const conteoClaves = new Map<number, number>();;
    const conteoEconomicos = new Map<string, number>();

    this.unidadesFromExcel().forEach(({ clave, economico }) => {
      conteoClaves.set(clave, (conteoClaves.get(clave) || 0) + 1);
      conteoEconomicos.set(economico, (conteoEconomicos.get(economico) || 0) + 1);
    });
    return this.unidadesFromExcel().filter(({ clave, economico }) => {
      return (conteoClaves.get(clave) || 0) > 1 ||
        (conteoEconomicos.get(economico) || 0) > 1;
    });
  });

  public thereAreDuplicatedRowsInDB = computed(() => (this.duplicatedRowsInDB().length > 0));
  public thereAreDuplicatedRowsInLocal = computed(() => (this.duplicatedRowsInLocal().length > 0));

  public displayedColumns: string[] = ['clave', 'economico'];
  public form = this.fb.group({
    unidades: this.fb.array([])
  });
  public accordion = viewChild.required(MatAccordion);
  public jsonError = json;



  ngOnInit() {
    this.dashBoardStore.getClaves();
    this.dashBoardStore.getEconomicosByEmpresa();
    this.dashBoardStore.getEquivalenciaUnidadDvrUnassigned();
    this.dashBoardStore.getEquivalenciasUnidadValidadorUnassigned();
  }

  public dowloadFile() {
    this.generateExcelFile.generateAndDownloadExcel(["CLAVE", "ECONOMICO"], "unidades");
  }

  public async getData() {
    this.gettingData.set(false);
    this.unidades.clear();
    const unidades = await ExcelExplorer.SelectExcel();
    this.gettingData.set(true);

    if (!unidades[0]?.clave) return;
    this.unidadesFromExcel.set([...unidades]);
    this.loadUnidades();
  }

  private loadUnidades() {
    if (this.thereAreDuplicatedRowsInDB() || this.thereAreDuplicatedRowsInLocal()) return;

    this.unidadesFromExcel().forEach(u => {
      const unidadControl = this.fb.group({
        clave: [{ value: u.clave, disabled: true }],
        economico: [{ value: u.economico, disabled: true }],
        idEmpresa: this.sessionService.empresa,
        estatus: true,
        idEquivalenciaUnidadValidador: ['', [Validators.required, isValueTaken('idEquivalenciaUnidadValidador')]],
        idEquivalenciaUnidadDrv: ['', [Validators.required, isValueTaken('idEquivalenciaUnidadDrv')]]
      });
      unidadControl.markAllAsTouched();
      this.unidades.push(unidadControl);
    });
  }

  public async save() {
    const confirmation = await this.messageDialogService.confirmationMessage(environment.defaultDeleteMessage);
    if (!confirmation) return;
    await this.dashBoardStore.addRangeUnidadAuto(this.newUnidades);
    this.dashBoardStore.resetLasIdUnidadesAutos();
    await this.dashBoardStore.loadUnidadesAutosPagedByEmpresa('', this.dashBoardStore.unidadesAutos().metadata.pageSize);
    this.modalsService.closeModal();
  }


  //#region Getters
  public get unidades(): FormArray {
    return this.form.get('unidades')! as FormArray;
  }

  public get thereAreUnidades(): boolean {
    return this.unidades.length > 0;
  }

  public get unidadesControls(): Array<AbstractControl> {
    return this.unidades.controls;
  }

  private get newUnidades(): Array<NewUnidadAuto> {
    const unidades: Array<NewUnidadAuto> = this.unidades.getRawValue();
    return unidades;
  }
  //#endregion
}
