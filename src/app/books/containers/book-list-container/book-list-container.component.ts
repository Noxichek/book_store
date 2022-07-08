import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { pluck, Subject, takeUntil, tap } from 'rxjs';

import { IBook } from '../../../../libs/book';
import { BookService } from '../../services/book.service';
import { IPaginatedBooks } from '../../../../libs/pagination';
import { ISearchBookData } from '../../interfaces/search-book-data-interface';

@Component({
  selector: 'app-book-list-container',
  templateUrl: './book-list-container.component.html',
  styleUrls: ['./book-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListContainerComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];
  public page = 1;
  public pageSize = 3;
  public length!: number;

  private readonly _destroy$ = new Subject<void>();
  private _isFiltersClear = false;

  constructor(
    private _bookService: BookService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this._loadData(this.page, this.pageSize);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public paginatedLoadData(): void {
    if (this._isFiltersClear) {
      return;
    }
    this._loadData(++this.page, this.pageSize);
  }

  public searchByAuthorName($event: ISearchBookData): void {
    const filteredResponse = { ...$event };
    Object.keys(filteredResponse).forEach((key: string) => {
      if(key && filteredResponse[key] === null || filteredResponse[key] === undefined) {
        delete filteredResponse[key];
      }
    });

    this._isFiltersClear = true;

    this._bookService.filteredSearch(filteredResponse)
      .pipe(
        pluck('books'),
        takeUntil(this._destroy$),
      )
      .subscribe( (response: IBook[]) => {
        this.books = response;
        this._changeDetectorRef.detectChanges();
      });
  }

  public clearFilters() {
    this._isFiltersClear = false;

    this._bookService.getBooks(1, 3)
      .pipe(
        tap((paginatedBooks: IPaginatedBooks) => {
          this.length = paginatedBooks.meta.records;
        }),
        pluck('books'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook[]) => {
        this.books = response;
        this._changeDetectorRef.detectChanges();
      });
  }

  private _loadData(page: number, pageSize: number): void {
    this._bookService.getBooks(page, pageSize)
      .pipe(
        tap((paginatedBooks: IPaginatedBooks) => {
          this.length = paginatedBooks.meta.records;
        }),
        pluck('books'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IBook[]) => {
        this.books = [...this.books, ...response];
        this._changeDetectorRef.detectChanges();
      });
  }

}
