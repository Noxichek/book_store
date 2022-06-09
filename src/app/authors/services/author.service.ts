import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IAuthor } from '../interfaces/author.interface';
import { IBook } from '../../book';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {

  constructor(private _httpClient: HttpClient) { }

  public getAuthorById(id: number): Observable<IAuthor> {
    return this._httpClient.get<IAuthor>(`api/authors/${id}`);
  }

  public getAllAuthors(): Observable<IAuthor[]> {
    return this._httpClient.get<IAuthor[]>('api/authors');
  }

  public getAllBooksOfCurrentAuthor(authorId: number): Observable<IBook[]> {
    return this._httpClient.get<IBook[]>(`api/authors/${authorId}/books`);
  }

  public getAuthorsFromPageNumber(pageNumber: number, elementsPerPage: number = 4): Observable<IAuthor[]> {
    return this._httpClient.get<IAuthor[]>(`api/authors?page=${pageNumber}&limit=${elementsPerPage}`);
  }
}
