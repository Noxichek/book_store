import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';
import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-author-info-container',
  templateUrl: './author-info-container.component.html',
  styleUrls: ['./author-info-container.component.scss'],
})
export class AuthorInfoContainerComponent implements OnInit, OnDestroy {

  @Input()
  public id!: number;

  public author!: IAuthor;
  public books!: IBook[];

  private readonly _destroy$ = new Subject<void>();

  constructor(private _authorService: AuthorService) {}

  public ngOnInit(): void {
    this._getAuthorById();
    this._getBooksByCurrentAuthor();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getAuthorById(): void {
    this._authorService.getAuthorById(this.id).pipe(
      takeUntil(this._destroy$),
    )
      .subscribe((response: IAuthor) => {
        this.author = response;
      });
  }

  private _getBooksByCurrentAuthor(): void {
    this._authorService.getAllBooksOfCurrentAuthor(this.id)
      .pipe(
        pluck('books'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook[]) => {
        this.books = response;
      });
  }

}
