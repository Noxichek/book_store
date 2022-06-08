import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBook} from "../../../index";
import {BookService} from "../../../services/book.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: IBook[] = [];
  private unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(private bookFetchService: BookService) {
  }


  ngOnInit(): void {
    this.bookFetchService.getAllBooks()
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(response => {
      this.books = response['books'];
      console.log(this.books);
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }
}
