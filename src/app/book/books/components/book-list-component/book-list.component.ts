import {Component, OnInit} from '@angular/core';
import {BookInterface} from "../../../index";
import {BookService} from "../../../services/book.service";

@Component({
  selector: 'app-books',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: BookInterface[] = [];

  constructor(private bookFetchService: BookService) {
  }


  ngOnInit(): void {
    this.bookFetchService.getAllBooks().subscribe(response => {
      this.books = response['books'];
      console.log(this.books);
    })
  }

}
