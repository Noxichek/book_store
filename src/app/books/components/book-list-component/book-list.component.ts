import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBook} from "../../../book";
import {BookService} from "../../../book/services/book.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: IBook[] = [];
  private unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(
    private bookFetchService: BookService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(({resolveData}) => {
      this.books = resolveData.books
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }
}
