import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAuthor} from "../interfaces/i-author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }

  getAuthorById(id: number): Observable<IAuthor> {
    return this.httpClient.get<IAuthor>(`api/authors/${id}`)
  }

  getAllAuthors(): Observable<IAuthor[]> {
    return this.httpClient.get<IAuthor[]>('api/authors')
  }

  getAllBooksOfCurrentAuthor(authorId: number) {
    return this.httpClient.get(`api/authors/${authorId}/books`)
  }
}
