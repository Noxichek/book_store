import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { IOrdering } from '../interfaces/ordering.interface';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {

  public order$: BehaviorSubject<IOrdering> = new BehaviorSubject<IOrdering>({} as IOrdering);

  constructor() {}
}
