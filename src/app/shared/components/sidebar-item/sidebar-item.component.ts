import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/material.module';
import { IsActiveDirective } from '@shared/directives/is-active.directive';
import { UppercasePipe } from '@shared/pipes/uppercase.pipe';
import { MenuItem, SubMenuItem } from '@models/custom-entities/menu-item';
import { SubmeniSidebarItemComponent } from '../submeni-sidebar-item/submeni-sidebar-item.component';
import { IsAdminDirective } from '@shared/directives/is-admin.directive';
import { SessionService } from '@services/session.service';
import { BaseStore } from '@store/base/base-store';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [MaterialModule, RouterModule, IsActiveDirective, UppercasePipe, SubmeniSidebarItemComponent],
  animations: [
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  private router = inject(Router);
  item = input.required<MenuItem>();
  isExpanded = signal(false);
  hasChildren: Signal<boolean> = computed(() => !!this.item().children);

  public sessionService = inject(SessionService);
  private baseStore = inject(BaseStore);

  public itemClicked(): void {
    if (!this.hasChildren()) {
      if (this.baseStore.isMobile()) {
        this.baseStore.closeMenu();
      }
      this.router.navigateByUrl(this.item().route)
    }
    else {
      this.isExpanded.set(!this.isExpanded());
    }
  }

  public subItemClicked(subElement: SubMenuItem) {
    if (this.baseStore.isMobile()) {
      this.baseStore.closeMenu();
    }
    const route = `${this.item().route}/${subElement.route}`
    this.router.navigateByUrl(route)

  }



  // itemClicked() {
  //   this.baseStore.toggle();
  //   this.dashBordStore.resetLasIdEmpresas();
  //   this.router.navigateByUrl(this.url());
  // }

  // public get isActivated(): boolean {
  //   const option: IsActiveMatchOptions = { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' }
  //   return this.router.isActive(this.url(), option);
  // };

}
