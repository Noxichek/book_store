import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren, EventEmitter,
  Input, Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { IAuthor } from '../../../authors/interfaces/author.interface';
import { TableCellDirective } from '../../directives/table-cell.directive';
import { TableHeaderDirective } from '../../directives/table-header.directive';
import { IMeta } from '../../../../libs/pagination';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableComponent {

  @Input()
  public result!: IAuthor[] | null;

  @Input()
  public isPagination!: boolean;

  @Input()
  public total?: IMeta | null | undefined;

  @Output()
  public goToPage: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public goToNextPage: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public goToPreviousPage: EventEmitter<number> = new EventEmitter<number>();

  @ContentChildren(TableCellDirective, { read: TemplateRef })
  public list!: QueryList<TemplateRef<TableCellDirective>>;

  @ContentChildren(TableHeaderDirective, { read: TemplateRef })
  public headerList!: QueryList<TemplateRef<TableHeaderDirective>>;

  public goTo(pageNumber: number): void {
    this.goToPage.emit(pageNumber);
  }

  public next(pageNumber: number): void {
    this.goToNextPage.emit(pageNumber);
  }

  public previous(pageNumber: number): void {
    this.goToPreviousPage.emit(pageNumber);
  }
}
