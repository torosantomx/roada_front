import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }
