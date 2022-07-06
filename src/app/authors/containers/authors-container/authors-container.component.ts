import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Observable, startWith, Subject, switchMap } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IPaginatedAuthor } from '../../../../libs/pagination';
import { IPagination } from '../../interfaces/pagination.interface';


@Component({
  selector: 'app-authors-container',
  templateUrl: './authors-container.component.html',
  styleUrls: ['./authors-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsContainerComponent implements OnDestroy {

  public readonly paginatedAuthors$!: Observable<IPaginatedAuthor>;

  private readonly _paginationChange$ = new Subject<IPagination>();

  constructor(private readonly _authorService: AuthorService) {
    this.paginatedAuthors$ = this._getPaginatedAuthors();
  }

  public ngOnDestroy(): void {
    this._paginationChange$.complete();
  }

  public changePage($event: PageEvent): void {
    const page = ++$event.pageIndex;
    const pageSize = $event.pageSize;
    this._paginationChange$.next({ page, pageSize });
  }

  private _getPaginatedAuthors(): Observable<IPaginatedAuthor> {
    return this._paginationChange$
      .pipe(
        startWith({ page: 1, pageSize: 5 }),
        switchMap(({ page, pageSize }: IPagination) => {
          return this._authorService.getAuthorsFromPageNumber(page, pageSize);
        }),
      );
  }

}
