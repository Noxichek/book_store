import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnDestroy {

  @Input()
  public current: number = 0;
  @Input()
  public total: number = 0;

  @Output()
  public goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public next: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];
  public $totalStream$?: Subject<number>;

  private _destroy$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {
    this.$totalStream$?.next(this.total);
    this.calcPages();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }
  public onNext(): void {
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    this.previous.next(this.current);
  }

  public calcPages(): void {
    this.$totalStream$?.pipe(
      takeUntil(this._destroy$),
    )
      .subscribe(() => {
        console.log(this.total);
      });
  }

}
