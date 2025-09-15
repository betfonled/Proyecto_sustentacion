import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinutesComponent } from './minutes.component';

const routes: Routes = [{ path: '', component: MinutesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinutesRoutingModule { }