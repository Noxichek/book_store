import { OnDestroy, Pipe, PipeTransform } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { IAuthor } from '../../../app/authors/interfaces/author.interface';
import { AuthorService } from '../../../app/authors/services/author.service';

@Pipe({
  name: 'authorFullName',
  pure: false,
})
export class AuthorFullNamePipe implements PipeTransform, OnDestroy {

  private _fullName: string = '';
  private _cachedId: number | undefined;
  private _destroy$ = new Subject<void>;

  constructor(private _authorService: AuthorService) {}

  public transform(authorId: number): string {
    if (authorId !== this._cachedId) {
      this._authorService.getAuthorById(authorId)
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((response: IAuthor) => {
          this._cachedId = authorId;
          this._fullName = `${response.first_name} ${response.last_name}`;
        });
    }

    return this._fullName;
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
