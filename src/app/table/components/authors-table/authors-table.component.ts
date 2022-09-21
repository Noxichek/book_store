import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, pluck, Subject, tap } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IPaginatedAuthor } from '../../../../libs/pagination';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsTableComponent implements OnInit{

  public authors$!: Observable<IAuthor[]>;
  public totalAuthors$ = new Subject<number | null>();

  constructor(
    private _authorService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthors();
  }

  private _getAllAuthors(): void {
    this.authors$ = this._authorService.getAllAuthors()
      .pipe(
        tap((response: IPaginatedAuthor) => {
          this.totalAuthors$.next(response.meta.records);
        }),
        pluck('authors'),
      );
  }

}
