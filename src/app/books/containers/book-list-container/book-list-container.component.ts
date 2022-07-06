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
    this._loadData(++this.page, this.pageSize);
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
