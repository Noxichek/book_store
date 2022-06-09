import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { forkJoin, map, pluck, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public dataSource: IAuthor[] = [];
  private _unsubscribeOnDestroy$ = new Subject<boolean>();


  constructor(private _authorFetchService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._loadData(1);
  }

  public ngOnDestroy(): void {
    this._unsubscribeOnDestroy$.next(true);
  }

  public _changePage(pageNumber: PageEvent): void {
    this._loadData(++pageNumber.pageIndex);
  }

  private _loadData(page: number): void {
    this._authorFetchService.getAuthorsFromPageNumber(page)
      .pipe(
        pluck('authors'),
        tap((authors: IAuthor[]) => {
          this.dataSource = authors;
        }),
        switchMap((response:IAuthor[]) => {
          const authorBookRequest = response.map((element: IAuthor) => {
            return this._authorFetchService.getAllBooksOfCurrentAuthor(element.id);
          });

          return forkJoin(authorBookRequest);
        }),
        map((response) => {
          return response.map((element) => {
            return element['books'];
          });
        }),
        takeUntil(this._unsubscribeOnDestroy$),
      )
      .subscribe((response) => {
        this.dataSource = this.dataSource.map((element: IAuthor, index: number) => {
          return { ...element, books: response[index] };
        });
      });
  }
}
