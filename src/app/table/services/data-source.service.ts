import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { IOrdering, ISortable } from '../interfaces/ordering.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  public order$: BehaviorSubject<IOrdering> = new BehaviorSubject<IOrdering>({} as IOrdering);

  public isSortable$: BehaviorSubject<ISortable> = new BehaviorSubject<ISortable>({} as ISortable);

  constructor() {}

  public changeOrder(field: string, direction: string): void {
  }
}
