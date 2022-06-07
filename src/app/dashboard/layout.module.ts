import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatTabsModule} from "@angular/material/tabs";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class LayoutModule { }
