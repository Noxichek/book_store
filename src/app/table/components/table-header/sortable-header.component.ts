import { Component, Input } from '@angular/core';

import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-sortable-header',
  templateUrl: './sortable-header.component.html',
  styleUrls: ['./sortable-header.component.scss'],
})
export class SortableHeaderComponent {

  @Input()
  public field: string = '';
  @Input()
  public direction: string = '';

  constructor(private _dataSourceService: DataSourceService) {}

  public sortBy(): void {
    this._dataSourceService.order$.next({ order: this.field, direction: this.direction });
  }
}
