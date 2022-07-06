import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Subject, takeUntil } from 'rxjs';

import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit, OnDestroy {

  @Input()
  public books: IBook[] = [];

  @Output()
  public scrolledToBottom = new EventEmitter<void>();

  private readonly _destroy$ = new Subject<void>();

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  private _scroll!: CdkVirtualScrollViewport;

  public ngOnInit(): void {
    this._initScrollListener();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public trackBy(index: number, book: IBook): number {
    return book.id!;
  }

  private _initScrollListener(): void {
    this._scroll.elementScrolled()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (this._scroll.measureScrollOffset('bottom') === 0) {
          this.scrolledToBottom.emit();
        }
      });
  }

}
