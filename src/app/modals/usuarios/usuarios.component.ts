import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { InfoNewUsuario } from '@models/custom-entities/info-new-usuario';
import { MaterialModule } from '@modules/material.module';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import errores from './usuarios.json';
import { checkIfUsuarioExits } from '@validators/check-if-user-exists';
import { UsuarioService } from '@services/usuario.service';
import { ModalsService } from '@services/modals.service';

@Component({
  selector: 'app-usuarios',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent extends FormComponent implements OnInit, OnDestroy {
  constructor() {
    super();
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nombreUsuario:
        [
          '',
          {
            validators: [Validators.required],
            asyncValidators: [checkIfUsuarioExits(this.usuarioService)],
            updateOn: 'blur'
          }
        ],
      clave: ['', Validators.required],
      empresas: ['', Validators.required]
    });

    ErrorMessageHandle(this.nombre, this.nombreError, errores.errors.nombre);
    ErrorMessageHandle(this.apellidoPaterno, this.apellidoPaternoError, errores.errors.apellidoPaterno);
    ErrorMessageHandle(this.apellidoMaterno, this.apellidoMaternoError, errores.errors.apellidoMaterno);
    ErrorMessageHandle(this.nombreUsuario, this.nombreUsuarioError, errores.errors.nombreUsuario);
    ErrorMessageHandle(this.clave, this.claveError, errores.errors.clave);
    ErrorMessageHandle(this.empresas, this.empresasError, errores.errors.empresas);
  }

  public hide = signal(true);

  public nombreError = signal(errores.errors.nombre.required);
  public apellidoMaternoError = signal(errores.errors.apellidoMaterno.required);
  public apellidoPaternoError = signal(errores.errors.apellidoPaterno.required);
  public nombreUsuarioError = signal(errores.errors.nombreUsuario.required);
  public claveError = signal(errores.errors.clave.required);
  public empresasError = signal(errores.errors.empresas.required);

  public dashBoardStore = inject(DashBoardStore);
  private usuarioService = inject(UsuarioService);
  private modalsService = inject(ModalsService);
  ngOnInit(): void {
    this.dashBoardStore.loadAllEmpresas();
  }
  ngOnDestroy(): void {
    this.dashBoardStore.resetSelectedUsuario();
  }

  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  public async save() {
    await this.dashBoardStore.registerUsuario(this.infoNewUsuario);
    this.dashBoardStore.resetLasIdUsuarios();
    await this.dashBoardStore.loadUsuarios('', this.dashBoardStore.usuarios().metadata.pageSize);
    this.modalsService.closeModal();
  }

  //#region Getteres
  public get nombre(): AbstractControl {
    return this.control('nombre');
  }
  public get apellidoPaterno(): AbstractControl {
    return this.control('apellidoPaterno');
  }
  public get apellidoMaterno(): AbstractControl {
    return this.control('apellidoMaterno');
  }
  public get nombreUsuario(): AbstractControl {
    return this.control('nombreUsuario');
  }
  public get clave(): AbstractControl {
    return this.control('clave');
  }
  public get empresas(): FormArray {
    return this.control('empresas')! as FormArray;
  }
  public get infoNewUsuario(): InfoNewUsuario {
    return this.form.value;
  }
  // public selectedEmpresas(): 
  //#region 

}
