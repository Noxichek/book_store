import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IPaginatedAuthor } from '../../../../libs/pagination';
import { IAuthor } from '../../interfaces/author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthorsComponent implements OnChanges {

  @Input()
  public paginatedAuthor!: IPaginatedAuthor | null;

  @Output()
  public readonly pageChange = new EventEmitter<PageEvent>();

  public authors: IAuthor[] = [];
  public pageSize = 5;

  public length: number = 20;

  public ngOnChanges(): void {
    if (this.paginatedAuthor) {
      this.authors = this.paginatedAuthor.authors;
      this.length = this.paginatedAuthor.meta.records;
    }
  }

  public changePage($event: PageEvent): void {
    this.pageChange.emit($event);
  }

}
