import {Component, OnInit} from '@angular/core';
import {FetchService} from "../../../../services/fetch.service";
import {Book} from "../../../interfaces/interfaces";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = []

  constructor(private fetchService: FetchService) {
  }


  ngOnInit(): void {
    this.fetchService.getAllBooks().subscribe(response => {
      this.books = response['books']
      console.log(this.books)
    })
  }

}
