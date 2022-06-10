import { IBook } from '../../book';

import { IMeta } from './meta.interface';

// FIXME Rename to IPaginatedBooks
// FIXME move to Book module
export interface IAuthorBooksResponse {
  books: IBook[],
  meta: IMeta
}
