import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, pluck, Subject, tap } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IMeta, IPaginatedAuthor } from '../../../../libs/pagination';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsTableComponent implements OnInit{

  public authors$!: Observable<IAuthor[]>;
  public totalAuthors$ = new Subject<IMeta | null>();

  constructor(
    private _authorService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthorsFromFirstPage();
  }

  public goToPage(pageNumber: number): void {
    this.authors$ = this._authorService.getAuthorsFromPageNumber(pageNumber, 10)
      .pipe(
        pluck('authors'),
      );
  }

  private _getAllAuthorsFromFirstPage(): void {
    this.authors$ = this._authorService.getAuthorsFromPageNumber(1, 10)
      .pipe(
        tap((response: IPaginatedAuthor) => {
          this.totalAuthors$.next(response.meta);
        }),
        pluck('authors'),
      );
  }

}
