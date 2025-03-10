import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AbstractControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@modules/material.module';
import { ModalHeaderComponent } from '@shared/components/modal-header/modal-header.component';
import { ErrorMessageHandle } from '@shared/utils/error-message-handle';
import { FormComponent } from '@shared/utils/form-component';
import { DashBoardStore } from '@store/bashboard/dash-board-store';
import errores from './usuarios.json';
import { checkIfUsuarioExits } from '@validators/check-if-user-exists';
import { UsuarioService } from '@services/usuario.service';
import { ModalsService } from '@services/modals.service';
import { UpdatableInfoUser } from '@models/types/updatable-info-user';
import { NewUsuario } from '@models/types/new-usuario';
import { UsuarioEmpresaDTO } from '@models/DTOs/usuario-empresaDTO';
import { UpperCaseDirective } from '@shared/directives/upper-case.directive';

@Component({
  selector: 'app-usuarios',
  imports: [ModalHeaderComponent, MaterialModule, ReactiveFormsModule, UpperCaseDirective],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent extends FormComponent implements OnInit, OnDestroy {
  constructor() {
    super();
    this.form = this.fb.group({
      nombre: [this.dashBoardStore.selectedUsuario().nombre ?? '', Validators.required],
      apellidoPaterno: [this.dashBoardStore.selectedUsuario().apellidoPaterno ?? '', Validators.required],
      apellidoMaterno: [this.dashBoardStore.selectedUsuario().apellidoMaterno ?? '', Validators.required],
      nombreUsuario:
        [
          this.dashBoardStore.selectedUsuario().nombreUsuario ?? '',
          {
            validators: [Validators.required],
            asyncValidators: [
              !this.dashBoardStore.isSelectedUsuario() ?
                checkIfUsuarioExits(this.usuarioService) :
                checkIfUsuarioExits(this.usuarioService, this.dashBoardStore.selectedUsuario().nombreUsuario)
            ],
            updateOn: 'blur'
          }
        ],
      clave: ['', this.dashBoardStore.isSelectedUsuario() ? [] : [Validators.required]],
      empresas: [this.dashBoardStore.isSelectedUsuario() ? this.dashBoardStore.selectedUsuario().empresas.map(e => e.idEmpresa) : '', Validators.required]
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
    await this.dashBoardStore.registerUsuario(this.newUsuario);
    this.dashBoardStore.resetLasIdUsuarios();
    await this.dashBoardStore.loadUsuarios('', this.dashBoardStore.usuarios().metadata.pageSize);
    this.modalsService.closeModal();
  }

  public async update() {
    await this.dashBoardStore.changeUserInfo(this.updatatedInfoUser);
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
  public get newUsuario(): NewUsuario {
    const newUsuario: NewUsuario = {
      ...this.form.value,
      empresas: this.form.value.empresas.map((e: number) => {
        const newUsuarioEmpresa: UsuarioEmpresaDTO = {
          idEmpresa: e,
          idUsuario: 0,
          id: 0
        }
        return newUsuarioEmpresa;
      }),
    }
    return newUsuario;
  }

  public get updatatedInfoUser(): UpdatableInfoUser {
    const user: UpdatableInfoUser = {
      id: this.dashBoardStore.selectedUsuario().id,
      ...this.form.value,
      empresas: this.form.value.empresas.map((idEmpresa: number) => {
        
        let id = 0;
        const index = this.dashBoardStore.selectedUsuario().empresas.findIndex(e => e.idEmpresa == idEmpresa)

        if(index >= 0)
          id = this.dashBoardStore.selectedUsuario().empresas[index].id;

        const newUsuarioEmpresa: UsuarioEmpresaDTO = {
          idEmpresa: idEmpresa,
          idUsuario:  this.dashBoardStore.selectedUsuario().id,
          id
        }
        return newUsuarioEmpresa;
      }),
    }

    return user;
  }
  // public selectedEmpresas(): 
  //#region 

}
