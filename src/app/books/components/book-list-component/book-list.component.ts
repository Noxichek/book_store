import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { IBook } from '../../../book';
import { BookService } from '../../../book/services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: IBook[] = [];
  private _unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(
    private _bookFetchService: BookService,
    private _route: ActivatedRoute,
  ) {}


  ngOnInit(): void {
    this._route.data
      .pipe(takeUntil(this._unsubscribeOnDestroy$))
      .subscribe(({ resolveData }) => {
        this.books = resolveData.books;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeOnDestroy$.next(true);
  }
}
