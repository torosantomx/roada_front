import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { AppRoutes, getChildRoutePath } from '@routes/app.routes';
import { SidebarItemComponent } from '@shared/components/sidebar-item/sidebar-item.component';
import { BaseStore } from '@store/base/base-store';
import { SessionService } from '@services/session.service';
import { MenuItem } from '@models/custom-entities/menu-item';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MaterialModule, SidebarItemComponent, UpperCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public baseStore = inject(BaseStore);
  private router = inject(Router);
  public sesionStore = inject(SessionService);

  public menuItems: Array<MenuItem> = [
    {
      label: 'Catálogos',
      icon: 'books',
      route: AppRoutes.dashboard.path,
      children: [
        { label: AppRoutes.dashboard.children.empresas, route: AppRoutes.dashboard.children.empresas },
        { label: AppRoutes.dashboard.children.rutas, route: AppRoutes.dashboard.children.rutas },
        { label: AppRoutes.dashboard.children.unidades, route: AppRoutes.dashboard.children.unidades }
      ]
    },
    // {
    //   label: 'Usuarios',
    //   icon: 'person',
    //   route: '/'
    // }
  ];

  public toggle() {
    this.baseStore.toggle();
  }

  public logOut(): void {
    this.baseStore.logOut();
    this.sesionStore.logOut();
    this.router.navigateByUrl(AppRoutes.login);
  }
}
