import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { TableCellDirective } from '../../directives/table-cell.directive';
import { TableHeaderDirective } from '../../directives/table-header.directive';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IMeta } from '../../../../libs/pagination';
import { IPaginatedMeta } from '../../interfaces/paginated-meta.interface';

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
  public goToPage: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();

  @Output()
  public goToNextPage: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();

  @Output()
  public goToPreviousPage: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();

  @Output()
  public changeElementsPerPage: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();

  @ContentChildren(TableCellDirective, { read: TemplateRef })
  public list!: QueryList<TemplateRef<TableCellDirective>>;

  @ContentChildren(TableHeaderDirective, { read: TemplateRef })
  public headerList!: QueryList<TemplateRef<TableHeaderDirective>>;

  public goTo($event: IPaginatedMeta): void {
    this.goToPage.emit($event);
  }

  public next($event: IPaginatedMeta): void {
    this.goToNextPage.emit($event);
  }

  public previous(pageNumber: IPaginatedMeta): void {
    this.goToPreviousPage.emit(pageNumber);
  }

  public changeElements($event: IPaginatedMeta): void {
    this.changeElementsPerPage.emit($event);
  }
}
