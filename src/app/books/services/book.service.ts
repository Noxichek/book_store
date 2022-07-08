import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IBook } from '../../../libs/book';
import { ICreateBookData } from '../interfaces/create-book-data-interface';
import { IPaginatedBooks } from '../../../libs/pagination';
import { ISearchBookData } from '../interfaces/search-book-data-interface';


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

  public getBooksByAuthor(lastName: string): Observable<IPaginatedBooks> {
    return this._httpClient.get<IPaginatedBooks>(`api/books?q[author_matches]=${lastName}`);
  }

  public filteredSearch(response: ISearchBookData): Observable<IPaginatedBooks> {
    const parameters = {
      'q[author_matches]': response['author'],
      'q[price_lteq]': response['maxPrice'],
      'q[price_gteq]': response['minPrice'],
      'q[date_gteq]': response['writingDate'],
      'q[date_lteq]': response['releaseDate'],
      'q[title_eq]': response['title'],
    };

    const filteredParameters = JSON.parse(JSON.stringify(parameters));

    return this._httpClient.get<IPaginatedBooks>('api/books', { params: filteredParameters });
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

  public createBook(id: number, data: ICreateBookData): Observable<IBook> {
    return this._httpClient.post<IBook>(`api/authors/${id}/books`, data);
  }
}

