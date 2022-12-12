import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { DataSourceService } from '../../services/data-source.service';
import { ISortable } from '../../interfaces/ordering.interface';


@Component({
  selector: 'app-sortable-header',
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.scss'],
})
export class SortableHeaderComponent implements OnInit, OnDestroy {

  @Input()
  public field: string = '';
  @Input()
  public direction: string = '';

  public isSortDesc = false;
  public isSortable = false;

  private _destroy$ = new Subject<void>();

  constructor(private _dataSourceService: DataSourceService) {}

  public ngOnInit(): void {
    this._listenOrder();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public sortBy(): void {
    this._dataSourceService.order$.next({ order: this.field, direction: this.direction });
  }

  private _listenOrder(): void {
    this._dataSourceService.isSortable$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: ISortable) => {
        this.isSortable = response.sortable;
        if (this.direction === response.direction) {
          this.isSortDesc = true;
        }
      });
  }
}
