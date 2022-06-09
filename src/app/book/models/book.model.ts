import { IBook, IBookModel } from '../interfaces/book.interface';
import { IMAGES } from '../mocks/book-images';

export class BookModel implements IBookModel {
  constructor(private _data: IBook) {
    this._setBookImage();
  }

  public get title(): string {
    return this._data.title;
  }

  public get imageUrl(): string {
    return this._data.imageUrl;
  }

  public get description(): string {
    return this._data.description;
  }

  public get id(): number {
    return this._data.id;
  }

  public get price(): number {
    return this._data.price;
  }

  public get authorId(): number {
    return this._data.author_id;
  }

  private _getRandomImageIndex(): number {
    const min = Math.ceil(0);
    const max = Math.floor(11);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _setBookImage(): void {
    const randomImage = IMAGES[this._getRandomImageIndex()];

    this._data = { ...this._data, imageUrl: randomImage };
  }
}
