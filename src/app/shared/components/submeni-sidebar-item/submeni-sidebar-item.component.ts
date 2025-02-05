import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { SubMenuItem } from '@models/custom-entities/menu-item';
import { UppercasePipe } from '@shared/pipes/uppercase.pipe';

@Component({
  selector: 'app-submeni-sidebar-item',
  imports: [UppercasePipe],
  templateUrl: './submeni-sidebar-item.component.html',
  styleUrl: './submeni-sidebar-item.component.scss'
})
export class SubmeniSidebarItemComponent {  
    subItem = input.required<SubMenuItem>();
}
