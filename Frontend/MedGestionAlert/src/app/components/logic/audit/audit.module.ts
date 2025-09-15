import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { LogErrorsComponent } from './log-errors/log-errors.component';
import { LogProcessComponent } from './log-process/log-process.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
  declarations: [
    AuditComponent,
    LogErrorsComponent,
    LogProcessComponent
  ],
  imports: [
    CommonModule,
    AuditRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AuditModule { }
