import { Component, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { AuthorService } from '../../../../app/authors/services/author.service';
import { IBook } from '../../index';
import { BookModel } from '../../models/book.model';
import { BookService } from '../../../../app/books/services/book.service';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})

export class BookCardComponent implements OnDestroy {

  @Input()
  public set book(value: IBook | null) {
    if (value) {
      this.currentBook = new BookModel(value);
    }
  }

  public currentBook!: BookModel;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private _authorFetchService: AuthorService,
    private _bookService: BookService,
  ) {}


  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
