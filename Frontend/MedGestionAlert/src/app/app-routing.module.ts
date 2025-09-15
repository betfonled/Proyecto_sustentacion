import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'administration', loadChildren: () => import('./components/logic/administration/administration.module').then(m => m.AdministrationModule) }, 
  { path: 'audit', loadChildren: () => import('./components/logic/audit/audit.module').then(m => m.AuditModule) },
  { path: 'login', loadChildren: () => import('./components/logic/authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'load-information', loadChildren: () => import('./components/logic/load-information/load-information.module').then(m => m.LoadInformationModule) },
  { path: 'reports', loadChildren: () => import('./components/logic/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'home', loadChildren: () => import('./components/logic/home/home.module').then(m => m.HomeModule) },
  { path: 'minutes', loadChildren: () => import('./components/logic/minutes/minutes/minutes.module').then(m => m.MinutesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
