import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { TableRoutingModule } from './table-routing.module';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { TableComponent } from './components/table/table.component';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableHeaderDirective } from './directives/table-header.directive';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { SortableHeaderComponent } from './components/table-header/sortable-header.component';
import { PagesPipe } from './pipes/pages.pipe';

@NgModule({
  declarations: [
    TableComponent,
    AuthorsTableComponent,
    TableCellDirective,
    TableHeaderDirective,
    PaginatorComponent,
    SortByPipe,
    SortableHeaderComponent,
    PagesPipe,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
  ],
})
export class TableModule {}
