import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BookService } from '../../services/book.service';
import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-book-info-container',
  templateUrl: './book-info-container.component.html',
  styleUrls: ['./book-info-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookInfoContainerComponent implements OnInit {

  @Input()
  public id!: number;

  public book$!: Observable<IBook>;

  constructor(private readonly _bookService: BookService) {}

  public ngOnInit(): void {
    this._getBook(this.id);
  }

  private _getBook(id: number): void {
    this.book$ = this._bookService.getBookById(id);
  }

}
