import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck, Subject, takeUntil } from 'rxjs';

import { IBook } from '../../../book';
import { BookService } from '../../../book/services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: IBook[] = [];
  private _destroy$ = new Subject<boolean>();

  constructor(
    private _bookFetchService: BookService,
    private _activatedRoute: ActivatedRoute,
  ) {}


  public ngOnInit(): void {
    this._activatedRoute.data
      .pipe(
        pluck('resolveData', 'books'),
        takeUntil(this._destroy$))
      .subscribe((books: IBook[]) => {
        this.books = books;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
