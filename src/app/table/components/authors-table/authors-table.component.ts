import {
  Component, ContentChild,
  ContentChildren,
  Input,
  QueryList, TemplateRef,
} from '@angular/core';

import { IAuthor } from '../../../authors/interfaces/author.interface';
import { TableDirective } from '../../directives/table.directive';
import { TableHeaderDirective } from '../../directives/table-header.directive';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
})

export class AuthorsTableComponent {

  @ContentChildren(TableDirective, { read: TemplateRef })
  public list!: QueryList<TemplateRef<TableDirective>>;

  @ContentChild(TableHeaderDirective, { static: true, read: TemplateRef })
  public headerList!: TemplateRef<TableHeaderDirective>;

  @Input()
  public result: IAuthor[] = [];

  public displayedColumns: string[] = ['ID', 'First Name', 'Last Name'];

}
