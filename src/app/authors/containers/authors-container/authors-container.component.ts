import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { pluck, Subject, takeUntil, tap } from 'rxjs';

import { AuthorService } from '../../services/author.service';
import { IPaginatedAuthor } from '../../../../libs/pagination';
import { IAuthor } from '../../interfaces/author.interface';


@Component({
  selector: 'app-authors-container',
  templateUrl: './authors-container.component.html',
  styleUrls: ['./authors-container.component.scss'],
})
export class AuthorsContainerComponent implements OnInit, OnDestroy {

  public dataSource: IAuthor[] = [];
  public page = 1;
  public pageSize = 5;
  public length!: number;

  private readonly _destroy$ = new Subject<boolean>();

  constructor(private readonly _authorService: AuthorService) {}

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
    this._authorService.getAuthorsFromPageNumber(page, pageSize)
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
