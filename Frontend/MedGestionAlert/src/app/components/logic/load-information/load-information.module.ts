import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadInformationRoutingModule } from './load-information-routing.module';
import { LoadInformationComponent } from './load-information.component';


@NgModule({
  declarations: [
    LoadInformationComponent
  ],
  imports: [
    CommonModule,
    LoadInformationRoutingModule
  ]
})
export class LoadInformationModule { }
