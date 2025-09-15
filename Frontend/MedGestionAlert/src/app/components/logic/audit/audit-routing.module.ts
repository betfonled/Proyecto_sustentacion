import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './audit.component';
import { LogErrorsComponent } from './log-errors/log-errors.component';
import { LogProcessComponent } from './log-process/log-process.component';

const routes: Routes = [
  { path: '', component: AuditComponent },
  { path: 'log-errors', component: LogErrorsComponent },
  { path: 'log-process', component: LogProcessComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRoutingModule {}
