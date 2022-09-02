import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';

import { DialogComponent } from '../dialog/dialog.component';
import { IAddAuthor } from '../../../authors/interfaces/add-author.interface';

@Component({
  selector: 'app-author-no-result',
  templateUrl: './author-no-result.component.html',
  styleUrls: ['./author-no-result.component.scss'],
})
export class AuthorNoResultComponent implements OnDestroy {

  @Input()
  public inputValue?: string;
  public firstName!: string;
  public lastName!: string;

  @Output()
  public authorData = new EventEmitter<IAddAuthor>;

  private _destroy$ = new Subject<void>();

  constructor(private _dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openDialog(): void {
    const dialogReference = this._dialog.open(DialogComponent, {
      width: '250px',
      data: { first_name: this.firstName, last_name: this.lastName },
    });

    dialogReference.afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((result: IAddAuthor) => {
        if(result.first_name !== '' && result.last_name !== '') {
          this.authorData.emit(result);
        }
      });
  }
}
