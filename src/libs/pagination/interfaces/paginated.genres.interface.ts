import { IGenre } from '../../../app/genres/interfaces/genre-interface';

import { IMeta } from './meta.interface';

export interface IPaginatedGenres {
  genres: IGenre[];
  meta: IMeta;
}
