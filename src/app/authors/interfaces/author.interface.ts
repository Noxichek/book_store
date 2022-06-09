import { IBook } from '../../book';

export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
  books?: IBook[];
}
