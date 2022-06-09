import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IBook } from '../../../book';
import { BookModel } from '../../../book/models/book.model';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})

export class BookCardComponent implements OnInit, OnDestroy {
  @Input() public set book(value: IBook | null) {
    this.currentBook = new BookModel(value);
    this._getAuthorFullName();
  }

  public currentBook: BookModel = {} as BookModel;
  public author: IAuthor = {} as IAuthor;
  private _unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(private _authorFetchService: AuthorService,
              private _router: Router,
  ) {}

  public ngOnInit(): void {
    this._getAuthorFullName();
  }

  public ngOnDestroy(): void {
    this._unsubscribeOnDestroy$.next(true);
  }

  private _getAuthorFullName(): void {
    const { authorId } = this.currentBook;

    this._authorFetchService.getAuthorById(authorId)
      .pipe(takeUntil(this._unsubscribeOnDestroy$))
      .subscribe((response: IAuthor) => {
        this.author = response;
      });
  }
}
