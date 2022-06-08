import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorService} from "../../../authors/services/author.service";
import {IAuthor} from "../../../authors/interfaces/author.interface";
import {IBook} from "../../../book";
import {BookModel} from "../../../book/models/book.model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})

export class BookCardComponent implements OnInit, OnDestroy {
  @Input() set book(value: IBook | null) {
    this.currentBook = new BookModel(value);
    this.getAuthorFullName();
  }

  currentBook: BookModel = {} as BookModel;
  public author: IAuthor = {} as IAuthor;
  private unsubscribeOnDestroy$ = new Subject<boolean>();

  constructor(private authorFetchService: AuthorService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAuthorFullName();
  }

  getAuthorFullName() {
    const {authorId} = this.currentBook;

    this.authorFetchService.getAuthorById(authorId)
      .pipe(takeUntil(this.unsubscribeOnDestroy$))
      .subscribe(response => {
        this.author = response;
      });
  }

  goToInfo(id: number) {
    this.router.navigate([`books/${id}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribeOnDestroy$.next(true)
  }
}
