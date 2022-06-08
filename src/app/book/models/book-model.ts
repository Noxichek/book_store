import {IBook} from "../interfaces/i-book";
import {IMAGES} from "../mocks/book-images";

export class BookModel {
  constructor(private data: IBook) {
    this.setBookImage();
  }

  get title(): string {
    return this.data.title;
  }

  get imageUrl(): string {
    return this.data.imageUrl;
  }

  get description(): string {
    return this.data.description;
  }

  get id(): number {
    return this.data.id;
  }

  get price(): number {
    return this.data.price;
  }

  get authorId(): number {
    return this.data.author_id;
  }

  private getRandomImageIndex(): number {
    const min = Math.ceil(0);
    const max = Math.floor(11);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  private setBookImage(): void {
    const randomImage = IMAGES[this.getRandomImageIndex()];

    this.data = {...this.data, imageUrl: randomImage};
  }
}
