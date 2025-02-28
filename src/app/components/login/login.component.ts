import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { AppRoutes } from '@routes/app.routes';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '@models/custom-entities/credentials';
import { BaseStore } from '@store/base/base-store';
import { SessionService } from '@services/session.service';
import { LoadingScreenService } from '@services/loading-screen.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, UpperCasePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public hide = signal(true);
  private router = inject(Router);
  public fb = inject(FormBuilder);
  public baseStore = inject(BaseStore);
  public sessionService = inject(SessionService);
  private loadinService = inject(LoadingScreenService);


  public formLogin = this.fb.group(
    {
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required]
    },
  )

  public empresa = new FormControl('', Validators.required);



  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  public async login() {
    if (this.formLogin.invalid) return;
    await this.baseStore.login(this.credentials);

    const user = this.baseStore.usuario();
    const token = this.baseStore.token();
    if (!user || !token) return;
    
    this.sessionService.login(user, token);
  }

  public goToDashboard(): void {
    if (this.empresa.invalid) return;
    // const name = this.baseStore.
    this.sessionService.setEmpresa(Number(this.empresa.value!));
    this.router.navigateByUrl(AppRoutes.dashboard.path);
  }

  private control(name: string) {
    return this.formLogin.get(name)!;
  }
  private get nombreUsuario(): string {
    return this.control('nombreUsuario').value;
  }
  private get clave(): string {
    return this.control('clave').value;
  }

  private get credentials(): Credentials {
    return {
      nombreUsuario: this.nombreUsuario,
      clave: this.clave
    }
  }
}
