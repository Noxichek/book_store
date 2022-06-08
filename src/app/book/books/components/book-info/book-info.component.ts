import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeMap, Subject, Subscription, takeUntil} from "rxjs";
import {BookService} from "../../../services/book.service";
import {IBook} from "../../../index";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit, OnDestroy {
  book!: IBook;
  bookSub: Subscription;
  private unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(private bookFetchService: BookService,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.bookSub = this.route.params.pipe(
      takeUntil(this.unsubscribeOnDestroy$),
      mergeMap(params => {
        return this.bookFetchService.getBookById(params['id']);
      })
    ).subscribe(response => {
      this.book = response
      console.log(this.book)
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }
}
