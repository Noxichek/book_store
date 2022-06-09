import { Pipe, PipeTransform } from '@angular/core';

import { IAuthor } from '../../authors/interfaces/author.interface';

@Pipe({
  name: 'authorFullName',
})
export class AuthorFullNamePipe implements PipeTransform {

  public transform(author: IAuthor): string {
    if (author) {
      return `${author.first_name} ${author.last_name} `;
    }

    return '';
  }

}
