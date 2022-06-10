import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// FIXME Incorrect import format
import { Router }                              from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
// FIXME Incorrect import format
import { IAuthor }       from '../../../authors/interfaces/author.interface';
import { IBook }         from '../../../book';
import { BookModel }     from '../../../book/models/book.model';
import { BookService }   from '../../../book/services/book.service';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})

export class BookCardComponent implements OnInit, OnDestroy {

  @Input()
  public set book(value: IBook | null) {
    if (value) {
      this.currentBook = new BookModel(value);
      this._getAuthorFullName();
    }
  }

  public currentBook!: BookModel;
  public author!: IAuthor;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private _authorFetchService: AuthorService,
    private _bookService: BookService,
    // FIXME Unused Router
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this._getAuthorFullName();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  // FIXME Getting author should be in angular pipe
  private _getAuthorFullName(): void {
    const {authorId} = this.currentBook;

    this._authorFetchService.getAuthorById(authorId)
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: IAuthor) => {
        this.author = response;
      });
  }
}
