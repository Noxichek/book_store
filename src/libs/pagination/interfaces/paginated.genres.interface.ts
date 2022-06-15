import { IGenre } from '../../../app/books/interfaces/genre-interface';

import { IMeta } from './meta.interface';

export interface IPaginatedGenres {
  genres: IGenre[];
  meta: IMeta;
}
