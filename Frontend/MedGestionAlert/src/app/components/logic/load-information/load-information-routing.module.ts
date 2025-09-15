import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadInformationComponent } from './load-information.component';
import { ClientsComponent } from './clients/clients.component';
import { CreateClientsComponent } from './clients/create-clients/create-clients.component';


const routes: Routes = [
  { path: '', component: LoadInformationComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'create-clients', component: CreateClientsComponent },
  { path:'**', redirectTo:'' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadInformationRoutingModule { }
