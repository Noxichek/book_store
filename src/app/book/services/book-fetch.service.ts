import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IBook} from "../interfaces/i-book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookFetchService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>('api/books')
  }

  getBookById(id: number): Observable<IBook> {
    return this.httpClient.get<IBook>(`api/books/${id}`)
  }
}

