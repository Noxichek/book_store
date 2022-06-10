import { Component, OnDestroy, OnInit } from '@angular/core';
// FIXME Incorrect import format
import { ActivatedRoute }               from '@angular/router';

import { pluck, Subject, takeUntil } from 'rxjs';

// FIXME Incorrect import format
import { IBook }       from '../../../book';
import { BookService } from '../../../book/services/book.service';

// FIXME Incorrect folder name
@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  // FIXME Add new line
  public books: IBook[] = [];
  // FIXME Add new line
  private _destroy$ = new Subject<void>();

  constructor(
    private _bookFetchService: BookService,
    private _activatedRoute: ActivatedRoute,
  ) {}


  public ngOnInit(): void {
    this._activatedRoute.data
      .pipe(
        pluck('resolveData', 'books'),
        takeUntil(this._destroy$),
        // FIXME Closing bracket should be in new line
      )
      .subscribe((books: IBook[]) => {
        this.books = books;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    // FIXME this._destroy$.complete();
  }
  // FIXME Add new line
}
