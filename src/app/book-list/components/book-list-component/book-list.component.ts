import {Component, OnInit} from '@angular/core';
import {IBook} from "../../../book";
import {BookFetchService} from "../../../book/services/book-fetch.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: IBook[] = [];

  constructor(private bookFetchService: BookFetchService) {
  }


  ngOnInit(): void {
    this.bookFetchService.getAllBooks().subscribe(response => {
      this.books = response['books'];
      console.log(this.books);
    })
  }

}
