import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Observable, pluck, Subject } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';
import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-author-info-container',
  templateUrl: './author-info-container.component.html',
  styleUrls: ['./author-info-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInfoContainerComponent implements OnInit, OnDestroy {

  @Input()
  public id!: number;

  public author$!: Observable<IAuthor>;
  public books$!: Observable<IBook[]>;

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
    this.author$ = this._authorService.getAuthorById(this.id);
  }

  private _getBooksByCurrentAuthor(): void {
    this.books$ = this._authorService.getAllBooksOfCurrentAuthor(this.id)
      .pipe(
        pluck('books'),
      );
  }

}
