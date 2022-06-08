import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthorService} from "../../../authors/services/author.service";
import {IAuthor} from "../../../authors/interfaces/i-author";
import {BookInterface} from "../../../book";
import {BookModel} from "../../../book/models/book.model";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})

export class BookCardComponent implements OnInit {
  @Input() set book(value: BookInterface | null) {
    this.currentBook = new BookModel(value);
    this.getAuthorFullName();
  }

  currentBook: BookModel = {} as BookModel;

  public author: IAuthor = {} as IAuthor;

  constructor(private authorFetchService: AuthorService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAuthorFullName();
  }

  getAuthorFullName() {
    const {authorId} = this.currentBook;

    this.authorFetchService.getAuthorById(authorId).subscribe(response => {
      this.author = response;
    });
  }

  goToInfo(id: number) {
    this.router.navigate([`books/${id}`]);
  }
}
