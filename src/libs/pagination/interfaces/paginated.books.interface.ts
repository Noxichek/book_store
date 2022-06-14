import { IBook } from '../../book';

import { IMeta } from './meta.interface';

export interface IPaginatedBooks {
  books: IBook[],
  meta: IMeta
}
