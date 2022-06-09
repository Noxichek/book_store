import { IAuthor } from '../../authors/interfaces/author.interface';

import { IMeta } from './meta.interface';

export interface IPaginatedAuthor {
  authors: IAuthor[],
  meta: IMeta,
}
