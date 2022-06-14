import { IBook, IBookModel } from '../interfaces/book.interface';
import { IAuthor } from '../../../app/authors/interfaces/author.interface';
import { IMAGES } from '../mocks/book-images';

export class BookModel implements IBookModel {

  public title: string;
  public description: string;
  public id: number;
  public imageUrl?: string;
  public price?: number;
  public authorId: number;
  public release_date?: Date;
  public writing_date?: Date;
  public genres?: any;
  public author?: IAuthor;

  constructor(
    private _data: IBook,
  ) {
    this._setBookImage();
    this.title = _data.title;
    this.description = _data.description;
    this.id = _data.id;
    this.price = _data.price;
    this.authorId = _data.author_id;
    this.release_date = _data.release_date;
    this.writing_date = _data.writing_date;
    this.genres = _data.genres;
    this.author = _data.author;
  }

  private static _getRandomImageIndex(): number {
    const min = Math.ceil(0);
    const max = Math.floor(11);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _setBookImage(): void {
    this.imageUrl = IMAGES[BookModel._getRandomImageIndex()];
  }
}
