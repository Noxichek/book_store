import { Pipe, PipeTransform } from '@angular/core';

import { IAuthor } from '../../../app/authors/interfaces/author.interface';
import { AuthorService } from '../../../app/authors/services/author.service';

@Pipe({
  name: 'authorFullName',
  pure: false,
})
export class AuthorFullNamePipe implements PipeTransform {

  private _fullName: string = '';

  constructor(private _authorService: AuthorService) {}

  public transform(author: IAuthor): string {

    return this._fullName = `${author.firstName} ${author.lastName}`;
  }

}
