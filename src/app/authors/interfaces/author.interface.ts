import { IBook } from '../../../libs/book';

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
  books?: IBook[];
}
