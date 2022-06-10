import { IAuthor } from '../../authors/interfaces/author.interface';

import { IMeta } from './meta.interface';
// FIXME Should be in Author
export interface IPaginatedAuthor {
  authors: IAuthor[],
  meta: IMeta,
}
