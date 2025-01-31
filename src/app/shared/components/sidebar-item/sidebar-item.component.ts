import { Component, computed, inject, input } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterModule } from '@angular/router';
import { BaseStore } from '@store/base/base-store';
import { MaterialModule } from '@modules/material.module';
import { IsActiveDirective } from '@shared/directives/is-active.directive';
import { UppercasePipe } from '@shared/pipes/uppercase.pipe';
import { DashBoardStore } from '@store/bashboard/dash-board-store';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,

  imports: [MaterialModule, RouterModule, IsActiveDirective, UppercasePipe],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  private baseStore = inject(BaseStore);
  private dashBordStore = inject(DashBoardStore);
  private router = inject(Router);
  

  icon = input.required<string>();
  text = input.required<string>();
  url = input.required<string>();

  itemClicked() {
    this.baseStore.toggle();
    this.dashBordStore.resetLasIdEmpresas();
    this.router.navigateByUrl(this.url());
  }

  public get isActivated(): boolean {
    const option: IsActiveMatchOptions = { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' }
    return this.router.isActive(this.url(), option);
  };

}
