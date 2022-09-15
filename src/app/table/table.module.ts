import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './components/table/table.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { TableDirective } from './directives/table.directive';
import { TableHeaderDirective } from './directives/table-header.directive';


@NgModule({
  declarations: [
    TableComponent,
    AuthorsTableComponent,
    TableDirective,
    TableHeaderDirective,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatTableModule,
  ],
})
export class TableModule {}
