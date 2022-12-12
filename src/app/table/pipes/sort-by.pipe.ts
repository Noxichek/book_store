import { Pipe, PipeTransform } from '@angular/core';

// @ts-ignore
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {

  public transform(value: any[], order: string = '', column: string = ''): any[] {
    if (!value || order === '' || !order) {
      return value;
    }
    if (value.length <= 1) {
      return value;
    }
    if (!column || column === '') {
      if (order === 'asc') {
        return value.sort();
      }

      return value.sort().reverse();
    }

    return orderBy(value, [column], [order]);
  }

}
