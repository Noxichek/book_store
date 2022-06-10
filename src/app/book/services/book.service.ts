import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// FIXME fix order
import { HttpClient } from '@angular/common/http';

import { IBook } from '../interfaces/book.interface';


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
}

