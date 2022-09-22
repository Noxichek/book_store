import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, pluck, Subject, tap } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IMeta, IPaginatedAuthor } from '../../../../libs/pagination';
import { IPaginatedMeta } from '../../interfaces/paginated-meta.interface';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsTableComponent implements OnInit {

  public authors$!: Observable<IAuthor[]>;
  public totalAuthors$ = new Subject<IMeta | null>();

  constructor(
    private _authorService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthorsFromFirstPage();
  }

  public goToPage($event: IPaginatedMeta): void {
    this.authors$ = this._authorService
      .getAuthorsFromPageNumber($event.page, $event.elementsPerPage)
      .pipe(
        tap((response: IPaginatedAuthor) => this.totalAuthors$.next(response.meta)),
        pluck('authors'),
      );
  }

  private _getAllAuthorsFromFirstPage(): void {
    this.authors$ = this._authorService.getAuthorsFromPageNumber(1, 5)
      .pipe(
        tap((response: IPaginatedAuthor) => {
          this.totalAuthors$.next(response.meta);
        }),
        pluck('authors'),
      );
  }

}
