import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';
import { IBook } from '../../../../libs/book';


@Component({
  selector: 'app-author-info-component',
  templateUrl: './author.info.component.html',
  styleUrls: ['./author.info.component.scss'],
})
export class AuthorInfoComponent implements OnInit, OnDestroy {

  public author!: IAuthor;
  public books!: IBook[];

  private _destroy$ = new Subject<void>();

  constructor(
    private _authorService: AuthorService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._getAuthorById();
    this._getBooksByCurrentAuthor();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getAuthorById(): void {
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    this._authorService.getAuthorById(id).pipe(
      takeUntil(this._destroy$),
    )
      .subscribe((response: IAuthor) => {
        this.author = response;
      });
  }

  private _getBooksByCurrentAuthor(): void {
    this._authorService.getAllBooksOfCurrentAuthor
    (Number(this._activatedRoute.snapshot.paramMap.get('id')))
      .pipe(
        pluck('books'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook[]) => {
        this.books = response;
      });
  }

}
