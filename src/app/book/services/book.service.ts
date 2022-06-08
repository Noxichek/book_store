import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BookInterface} from "../interfaces/book.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<BookInterface[]> {
    return this.httpClient.get<BookInterface[]>('api/books')
  }

  getBookById(id: number): Observable<BookInterface> {
    return this.httpClient.get<BookInterface>(`api/books/${id}`)
  }
}

