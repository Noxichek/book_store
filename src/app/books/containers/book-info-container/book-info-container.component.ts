import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { BookService } from '../../services/book.service';
import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-book-info-container',
  templateUrl: './book-info-container.component.html',
  styleUrls: ['./book-info-container.component.scss'],
})
export class BookInfoContainerComponent implements OnInit, OnDestroy {

  @Input()
  public id!: number;

  public book!: IBook;

  private readonly _destroy$ = new Subject<boolean>();

  constructor(private _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBook(this.id);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  private _getBook(id: number) {
    this._bookService.getBookById(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook) => {
        this.book = response;
      });
  }

}
