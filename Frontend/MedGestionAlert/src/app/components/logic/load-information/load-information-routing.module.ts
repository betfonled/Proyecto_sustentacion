import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadInformationComponent } from './load-information.component';

const routes: Routes = [{ path: '', component: LoadInformationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadInformationRoutingModule { }
