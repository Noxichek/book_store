import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IBook} from "../interfaces/book.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<IBook[]> {
    return this.httpClient.get<IBook[]>('api/books')
  }

  getBookById(id: number): Observable<IBook> {
    return this.httpClient.get<IBook>(`api/books/${id}`)
  }
}

