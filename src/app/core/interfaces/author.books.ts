import { IBook } from '../../book';

import { IMeta } from './meta.interface';

export interface IAuthorBooksResponse {
  books: IBook[],
  meta: IMeta
}
