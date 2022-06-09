import { Injectable } from '@angular/core';

import { BookService } from './book.service';

@Injectable({
  providedIn: 'root',
})
export class BookResolveService {

  constructor(private _bookService: BookService) {}

  public resolve() {
    return this._bookService.getAllBooks();
  }
}
