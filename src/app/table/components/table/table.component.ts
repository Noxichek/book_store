import { Component, OnDestroy, OnInit } from '@angular/core';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {

  public authors: IAuthor[] = [];
  private _destroy$ = new Subject<void>();

  constructor(
    private _authorService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getAllAuthors(): void {
    this._authorService.getAllAuthors()
      .pipe(
        pluck('authors'),
        takeUntil(this._destroy$),
      )
      .subscribe((authors: IAuthor[]) => {
        this.authors = authors;
      });
  }

}
