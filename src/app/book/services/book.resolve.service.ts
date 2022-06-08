import { Injectable } from '@angular/core';
import {BookService} from "./book.service";

@Injectable({
  providedIn: 'root'
})
export class BookResolveService {

  constructor(private bookService: BookService) { }

  resolve() {
      return this.bookService.getAllBooks()
  }
}
