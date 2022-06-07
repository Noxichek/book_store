import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Author, Book} from "../app/interfaces/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books')
  }

  getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`api/authors/${id}`)
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`)
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('api/authors')
  }
}
