import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { UsersComponent } from './users/users.component';
import { RolsComponent } from './rols/rols.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { RolsDialogComponent } from './rols/rols-dialog/rols-dialog.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  { path: 'users', component: UsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'rols', component: RolsComponent },
  { path: 'rol-dialog', component: RolsDialogComponent },
  { path:'**', redirectTo:'' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
