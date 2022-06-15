import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IBook } from '../../../libs/book';


@Injectable({
  providedIn: 'root',
})
export class BookService {

  constructor(private _httpClient: HttpClient) {}

  public getAllBooks(): Observable<IBook[]> {
    return this._httpClient.get<IBook[]>('api/books');
  }

  public getBookById(id: number): Observable<IBook> {
    return this._httpClient.get<IBook>(`api/books/${id}`);
  }

  public createBook(id: number, book: IBook) {
    this._httpClient.post(`api/authors/${id}/books`, book);
  }
}

