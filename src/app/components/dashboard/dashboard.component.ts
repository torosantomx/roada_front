import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { AppRoutes } from '@routes/app.routes';
import { SidebarItemComponent } from '@shared/components/sidebar-item/sidebar-item.component';
import { BaseStore } from '@store/base/base-store';
import { SessionService } from '@services/session.service';
import { MenuItem } from '@models/custom-entities/menu-item';
import { UpperCasePipe } from '@angular/common';
import { ModalsService } from '@services/modals.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,
    MaterialModule,
    SidebarItemComponent,
    UpperCasePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public baseStore = inject(BaseStore);
  private router = inject(Router);
  private modalService = inject(ModalsService);
  public sesionStore = inject(SessionService);

  public menuItems: Array<MenuItem> = [
    {
      label: AppRoutes.dashboard.children.procesamiento.name,
      route: `${AppRoutes.dashboard.path}/${AppRoutes.dashboard.children.procesamiento.path}`,
      icon: 'published_with_changes'
    },
    {
      label: AppRoutes.dashboard.children.catalgos.name,
      icon: 'books',
      route: `${AppRoutes.dashboard.path}/${AppRoutes.dashboard.children.catalgos.path}`,
      children: [
        {
          label: AppRoutes.dashboard.children.catalgos.children.empresas.name,
          route: AppRoutes.dashboard.children.catalgos.children.empresas.path,
          onlyAdmin: true
        },
        {
          label: AppRoutes.dashboard.children.catalgos.children.rutas.name,
          route: AppRoutes.dashboard.children.catalgos.children.rutas.path, onlyAdmin: true
        },
        {
          label: AppRoutes.dashboard.children.catalgos.children.unidades.name,
          route: AppRoutes.dashboard.children.catalgos.children.unidades.path
        },
        {
          label: AppRoutes.dashboard.children.catalgos.children.asignacionRutas.name,
          route: AppRoutes.dashboard.children.catalgos.children.asignacionRutas.path,
        }
      ]
    },

    {
      label: AppRoutes.dashboard.children.usuarios.name,
      route: `${AppRoutes.dashboard.path}/${AppRoutes.dashboard.children.usuarios.path}`,
      icon: 'admin_panel_settings',
      onlyAdmin: true
    },
    {
      label: AppRoutes.dashboard.children.turnos.name,
      route: `${AppRoutes.dashboard.path}/${AppRoutes.dashboard.children.turnos.path}`,
      icon: 'date_range'
    }

  ]
  public toggle() {
    this.baseStore.toggle();
  }

  public logOut(): void {
    this.baseStore.logOut();
    this.sesionStore.logOut();
    this.router.navigateByUrl(AppRoutes.login.path);
  }

  public elementClicked(value: string) {
    switch (value) {
      case AppRoutes.dashboard.children.turnos.name:
        this.modalService.openModal('turnos');
        break;
    }
  }
}
