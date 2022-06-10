import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IBook } from '../interfaces/book.interface';

import { BookService } from '../services/book.service';


@Injectable({
  providedIn: 'root',
})
export class BooksResolver {

  constructor(private _bookService: BookService) {}

  public resolve(): Observable<IBook[]> {
    return this._bookService.getAllBooks();
  }
}
