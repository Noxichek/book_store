import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { forkJoin, map, Observable, pluck, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';
import { IPaginatedAuthor } from '../../../core/interfaces/paginated.interface';
import { IAuthorBooksResponse } from '../../../core/interfaces/author.books';
import { IBook } from '../../../book';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})

export class AuthorsComponent implements OnInit, OnDestroy {

  public readonly displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public dataSource: IAuthor[] = [];
  public page = 1;
  public pageSize = 5;
  public length!: number;

  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private readonly _authorFetchService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._loadData(this.page, this.pageSize);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  public _changePage($event: PageEvent): void {
    this.page = ++$event.pageIndex;
    this.pageSize = $event.pageSize;

    this._loadData(this.page, this.pageSize);
  }

  private _loadData(page: number, pageSize: number): void {
    this._authorFetchService.getAuthorsFromPageNumber(page, pageSize)
      .pipe(
        tap((paginatedAuthor: IPaginatedAuthor) => {
          this.length = paginatedAuthor.meta.records;
        }),
        pluck('authors'),
        tap((authors: IAuthor[]) => {
          this.dataSource = authors;
        }),
        switchMap((response:IAuthor[]): Observable<IAuthorBooksResponse[]> => {
          const authorBookRequest = response.map((element: IAuthor) => {
            return this._authorFetchService.getAllBooksOfCurrentAuthor(element.id);
          });

          return forkJoin(authorBookRequest);
        }),
        map((response: IAuthorBooksResponse[]): IBook[][] => {
          return response.map((element: IAuthorBooksResponse) => {
            return element['books'];
          });
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook[][]) => {
        this.dataSource = this.dataSource.map((element: IAuthor, index: number): IAuthor => {
          return { ...element, books: response[index] };
        });
      });
  }
}
