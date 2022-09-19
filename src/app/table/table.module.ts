import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { TableComponent } from './components/table/table.component';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableHeaderDirective } from './directives/table-header.directive';

@NgModule({
  declarations: [
    TableComponent,
    AuthorsTableComponent,
    TableCellDirective,
    TableHeaderDirective,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
  ],
})
export class TableModule {}
