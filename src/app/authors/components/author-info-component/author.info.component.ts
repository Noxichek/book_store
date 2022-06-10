import { Component, OnDestroy, OnInit } from '@angular/core';
// FIXME Incorrect import format
import { ActivatedRoute }     from '@angular/router';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../services/author.service';
// FIXME Incorrect import format
import { IAuthor }       from '../../interfaces/author.interface';
import { IBook }         from '../../../book';


@Component({
  selector: 'app-author-info-component',
  templateUrl: './author.info.component.html',
  styleUrls: ['./author.info.component.scss'],
})
export class AuthorInfoComponent implements OnInit, OnDestroy {

  public author!: IAuthor;
  public books!: IBook[];
  // FIXME Add empty line
  // FIXME Should b e Subject<void>
  private _destroy$ = new Subject<boolean>();

  constructor(
    private _authorService: AuthorService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    // FIXME Move to personal method
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    this._authorService.getAuthorById(id).pipe(
      takeUntil(this._destroy$),
    )
      .subscribe((response: IAuthor) => {
        this.author = response;
      });

    this.getBooksByCurrentAuthor();
  }

  // FIXME Should be private
  public getBooksByCurrentAuthor(): void {
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

  // FIXME Should be after ngOnInit
  public ngOnDestroy(): void {
    // FIXME change next ot complete
    this._destroy$.next(true);
  }
}
