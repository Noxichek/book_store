import { IBook } from '../../../libs/book';

export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
  books?: IBook[];
}
