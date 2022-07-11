import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { IPaginatedGenres } from '../../../libs/pagination/interfaces/paginated.genres.interface';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

  constructor(private readonly _httpClient: HttpClient) {}

  public getAllGenres(): Observable<IPaginatedGenres> {
    return this._httpClient.get<IPaginatedGenres>('api/genres');
  }
}
