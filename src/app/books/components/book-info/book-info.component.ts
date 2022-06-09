import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { mergeMap, Subject, Subscription, takeUntil } from 'rxjs';

import { BookService } from '../../../book/services/book.service';
import { IBook } from '../../../book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit, OnDestroy {
  public book!: IBook;
  private _bookSub: Subscription;
  private _unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(private _bookFetchService: BookService,
              private _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._bookSub = this._route.params.pipe(
      mergeMap((parameters: Params) => {
        return this._bookFetchService.getBookById(parameters['id']);
      }),
      takeUntil(this._unsubscribeOnDestroy$),
    ).subscribe((response: IBook) => {
      this.book = response;
      console.log(this.book);
    });
  }

  public ngOnDestroy(): void {
    this._unsubscribeOnDestroy$.next(true);
  }
}
