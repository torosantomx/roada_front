import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { AppRoutes, getChildRoutePath } from '@routes/app.routes';
import { SidebarItemComponent } from '@shared/components/sidebar-item/sidebar-item.component';
import { MenuItem } from '../../models/custom-entities/menu-item';
import { BaseStore } from '@store/base/base-store';
import { SessionService } from '@services/session.service';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, MaterialModule, SidebarItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public baseStore = inject(BaseStore);
  private router = inject(Router);
  private sesionStore = inject(SessionService);

  public menuItems: Array<MenuItem> = [
    { label: AppRoutes.dashboard.children.empresas, icon: 'business', route: getChildRoutePath('dashboard', 'empresas') },
    { label: AppRoutes.dashboard.children.rutas, icon: 'directions', route: getChildRoutePath('dashboard', 'rutas') },
    { label: AppRoutes.dashboard.children.unidades, icon: 'local_shipping', route: getChildRoutePath('dashboard', 'unidades') },
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
