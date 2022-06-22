import { Component, Input } from '@angular/core';

import { IBook } from '../../index';
import { BookModel } from '../../models/book.model';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})

export class BookCardComponent {

  @Input()
  public set book(value: IBook | null) {
    if (value) {
      this.currentBook = new BookModel(value);
    }
  }

  public currentBook!: BookModel;

}
