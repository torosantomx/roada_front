import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { Router } from '@angular/router';
import { AppRoutes } from '@routes/app.routes';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '@models/custom-entities/credentials';
import { BaseStore } from '@store/base/base-store';
import { SessionService } from '@services/session.service';
import { LoadingScreenService } from '@services/loading-screen.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public hide = signal(true);
  private router = inject(Router);
  public fb = inject(FormBuilder);
  private baseStore = inject(BaseStore);
  private sessionService = inject(SessionService);
  private loadinService = inject(LoadingScreenService);


  public formLogin = this.fb.group(
    {
      nombreUsuario: ['ameyallipj', Validators.required],
      clave: ['merida1985*', Validators.required]
    },
  )



  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  public async login() {
    this.loadinService.showLoadingScreen();
    return
    
    if (this.formLogin.invalid) return;
    await this.baseStore.login(this.credentials);

    const user = this.baseStore.usuario();
    const token = this.baseStore.token();
    
    if (user && token) {
      this.sessionService.login(user, token);
      this.router.navigateByUrl(AppRoutes.dashboard.path);
    }
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
