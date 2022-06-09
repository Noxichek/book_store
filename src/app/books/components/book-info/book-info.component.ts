import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { BookService } from '../../../book/services/book.service';
import { IBook } from '../../../book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit, OnDestroy {
  public book!: IBook;
  private _destroy$ = new Subject<boolean>();

  constructor(private _bookFetchService: BookService,
              private _activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const id = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    this._bookFetchService.getBookById(id).pipe(
      takeUntil(this._destroy$),
    ).subscribe((response: IBook) => {
      this.book = response;
      console.log(this.book);
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
