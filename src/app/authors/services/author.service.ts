import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAuthor} from "../interfaces/author.interface";
import {IBook} from "../../book";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  getAuthorById(id: number): Observable<IAuthor> {
    return this.httpClient.get<IAuthor>(`api/authors/${id}`);
  }

  getAllAuthors(): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>('api/authors');
  }

  getAllBooksOfCurrentAuthor(authorId: number): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>(`api/authors/${authorId}/books`);
  }

  getAuthorsFromPageNumber(pageNumber: number, elementsPerPage: number = 4): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>(`api/authors?page=${pageNumber}&limit=${elementsPerPage}`);
  }
}
