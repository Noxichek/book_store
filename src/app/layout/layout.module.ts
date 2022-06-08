import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./components/dashboard-component/dashboard.component";
import {MatTabsModule} from "@angular/material/tabs";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        RouterModule
    ],
  exports: [
    DashboardComponent
  ]
})
export class LayoutModule { }
