import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages',
  pure: false,
})
export class PagesPipe implements PipeTransform {

  public transform(value: number[], currentPage: number): number[] {
    if ((currentPage === 1 || currentPage === 2) && value.length >= 5) {
      return value.slice(0, 5);
    } else if ((currentPage === value.length || currentPage === value.length - 1)) {
      return value.slice(-5, value.length);
    }

    return value.slice(currentPage - 3, currentPage + 2);
  }

}
