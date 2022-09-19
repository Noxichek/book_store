import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { IAuthor } from '../../../authors/interfaces/author.interface';
import { TableCellDirective } from '../../directives/table-cell.directive';
import { TableHeaderDirective } from '../../directives/table-header.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent {

  @ContentChildren(TableCellDirective, { read: TemplateRef })
  public list!: QueryList<TemplateRef<TableCellDirective>>;

  @ContentChild(TableHeaderDirective, { static: true, read: TemplateRef })
  public headerList!: TemplateRef<TableHeaderDirective>;

  @Input()
  public result!: IAuthor[] | null;

  @Input()
  public displayedColumns: string[] = [];

}
