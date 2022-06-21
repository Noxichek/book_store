import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IBook } from '../../../libs/book';
import { IPaginatedBooks } from '../../../libs/pagination';


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

  public getBooks(
    pageNumber: number,
    elementsPerPage: number,
  ): Observable<IPaginatedBooks> {
    const parameters = {
      limit: elementsPerPage,
      page: pageNumber,
    };

    return this._httpClient.get<IPaginatedBooks>('api/books', { params: parameters });
  }
}

