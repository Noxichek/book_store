import { IAuthor } from '../../../app/authors/interfaces/author.interface';

export interface IBook extends IBookData {
  author_id: number;
  release_date: Date;
  writing_date: Date;
  genres?: any;
  author: IAuthor
}

export interface IBookModel extends IBookData {
  authorId: number;
}

export interface IBookData {
  title: string;
  description: string;
  id?: number;
  imageUrl?: string;
  price?: number;
}
