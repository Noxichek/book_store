import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';

import { DashboardComponent } from './components/dashboard-component/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class LayoutModule {}
