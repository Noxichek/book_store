import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { pluck, Subject, takeUntil, tap } from 'rxjs';

import { IBook } from '../../../../libs/book';
import { BookService } from '../../services/book.service';
import { IPaginatedBooks } from '../../../../libs/pagination';

@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {

  public books: IBook[] = [];
  public page = 1;
  public pageSize = 3;
  public length!: number;

  private _destroy$ = new Subject<void>();

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private _scroll!: CdkVirtualScrollViewport;

  constructor(
    private _bookFetchService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this._loadData(this.page, this.pageSize);
    this._initScrollListener();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public trackBy(index: number, book: IBook) {
    return book.id;
  }

  private _loadData(page: number, pageSize: number): void {
    this._bookFetchService.getBooks(page, pageSize)
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

  private _initScrollListener(): void {
    this._scroll.elementScrolled()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (this._scroll.measureScrollOffset('bottom') === 0) {
          this._loadData(++this.page, this.pageSize);
        }
      });
  }

}
