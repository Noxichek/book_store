import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, pluck, Subject, takeUntil, tap } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IMeta, IPaginatedAuthor } from '../../../../libs/pagination';
import { IPaginatedMeta } from '../../interfaces/paginated-meta.interface';
import { DataSourceService } from '../../services/data-source.service';
import { IOrdering } from '../../interfaces/ordering.interface';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsTableComponent implements OnInit, OnDestroy {

  public authors$!: Observable<IAuthor[]>;
  public totalAuthors$ = new Subject<IMeta | null>();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _authorService: AuthorService,
    private _dataSourceService: DataSourceService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthorsFromFirstPage();
    this._listenDataSource();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goToPage($event: IPaginatedMeta): void {
    this.authors$ = this._authorService
      .getAuthorsFromPageNumber($event.page, $event.elementsPerPage)
      .pipe(
        tap((response: IPaginatedAuthor) => this.totalAuthors$.next(response.meta)),
        pluck('authors'),
      );
  }

  private _getAllAuthorsFromFirstPage(): void {
    this.authors$ = this._authorService.getAuthorsFromPageNumber(1, 5)
      .pipe(
        tap((response: IPaginatedAuthor) => {
          this.totalAuthors$.next(response.meta);
        }),
        pluck('authors'),
      );
  }

  private _listenDataSource(): void {
    this._dataSourceService.order$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: IOrdering) => {
        console.log(response);
      });
  }

}
