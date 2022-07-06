import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IAuthor } from '../../interfaces/author.interface';
import { IBook } from '../../../../libs/book';


@Component({
  selector: 'app-author-info-component',
  templateUrl: './author.info.component.html',
  styleUrls: ['./author.info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorInfoComponent {

  @Input()
  public author!: IAuthor | null;
  @Input()
  public books!: IBook[] | null;

}
