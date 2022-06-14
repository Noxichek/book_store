import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { pluck, Subject, takeUntil, tap } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../interfaces/author.interface';
import { IPaginatedAuthor } from '../../../../libs/pagination';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})

export class AuthorsComponent implements OnInit, OnDestroy {

  public readonly displayedColumns = ['position', 'name', 'weight', 'symbol'];
  public dataSource: IAuthor[] = [];
  public page = 1;
  public pageSize = 5;
  public length!: number;

  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private readonly _authorFetchService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._loadData(this.page, this.pageSize);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  public changePage($event: PageEvent): void {
    this.page = ++$event.pageIndex;
    this.pageSize = $event.pageSize;

    this._loadData(this.page, this.pageSize);
  }

  private _loadData(page: number, pageSize: number): void {
    this._authorFetchService.getAuthorsFromPageNumber(page, pageSize)
      .pipe(
        tap((paginatedAuthor: IPaginatedAuthor) => {
          this.length = paginatedAuthor.meta.records;
        }),
        pluck('authors'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IAuthor[]) => {
        this.dataSource = response;
      });
  }

}
