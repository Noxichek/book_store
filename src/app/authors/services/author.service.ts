import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
// FIXME fix order
import { HttpClient } from '@angular/common/http';

import { IAuthor } from '../interfaces/author.interface';
import { IPaginatedAuthor } from '../../core/interfaces/paginated.interface';
import { IAuthorBooksResponse } from '../../core/interfaces/author.books';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  constructor(private _httpClient: HttpClient) {}

  public getAuthorById(id: number): Observable<IAuthor> {
    return this._httpClient.get<IAuthor>(`api/authors/${id}`);
  }

  public getAllAuthors(): Observable<IAuthor[]> {
    return this._httpClient.get<IAuthor[]>('api/authors');
  }

  public getAllBooksOfCurrentAuthor(authorId: number): Observable<IAuthorBooksResponse> {
    return this._httpClient.get<IAuthorBooksResponse>(`api/authors/${authorId}/books`);
  }

  public getAuthorsFromPageNumber(
    pageNumber: number,
    elementsPerPage: number): Observable<IPaginatedAuthor> {
    const parameters = {
      limit: elementsPerPage,
      page: pageNumber,
    };

    return this._httpClient.get<IPaginatedAuthor>('api/authors', {
      params: parameters,
    });
  }
}
