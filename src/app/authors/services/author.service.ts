import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IAuthor } from '../interfaces/author.interface';
import { IPaginatedAuthor, IPaginatedBooks } from '../../../libs/pagination';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  constructor(private readonly _httpClient: HttpClient) {}

  public getAuthorById(id: number): Observable<IAuthor> {
    return this._httpClient.get<IAuthor>(`api/authors/${id}`);
  }

  public getAllAuthors(): Observable<IPaginatedAuthor> {
    return this._httpClient.get<IPaginatedAuthor>('api/authors');
  }

  public getAllBooksOfCurrentAuthor(authorId: number): Observable<IPaginatedBooks> {
    return this._httpClient.get<IPaginatedBooks>(`api/authors/${authorId}/books`);
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
