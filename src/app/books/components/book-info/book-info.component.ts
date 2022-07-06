import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IBook } from '../../../../libs/book';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookInfoComponent {

  @Input()
  public book!: IBook | null;

}
