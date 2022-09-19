import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Observable, pluck } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';


@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsTableComponent implements OnInit{

  public authors$!: Observable<IAuthor[]>;
  public columns: string[] = ['ID', 'First Name', 'Last Name'];

  constructor(
    private _authorService: AuthorService,
  ) {}

  public ngOnInit(): void {
    this._getAllAuthors();
  }

  private _getAllAuthors(): void {
    this.authors$ = this._authorService.getAllAuthors()
      .pipe(
        pluck('authors'),
      );
  }

}
