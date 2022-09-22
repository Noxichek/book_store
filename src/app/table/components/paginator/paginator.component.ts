import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IMeta } from '../../../../libs/pagination';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {

  @Input()
  public set meta(meta: IMeta | null | undefined) {
    if (meta) {
      for (let value = 1; value <= meta.pages; value++) {
        this.pages.push(value);
      }
    }
  }

  @Output()
  public goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public next: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public previous: EventEmitter<number> = new EventEmitter<number>();

  public elementsPerPage = 5;
  public metaData: IMeta = {} as IMeta;
  public options: number[] = [5, 10, 25, 50];
  public pages: number[] = [];
  public current = 1;

  public onGoTo(page: number): void {
    if (this.current !== page) {
      this.goTo.emit(page);
      this.current = page;
    }
  }
  public onNext(): void {
    this.current++;
    this.next.emit(this.current);
  }
  public onPrevious(): void {
    this.current--;
    this.previous.next(this.current);
  }

  public changeElementsPerPage(elementsPerPage: number) : void {

  }

}
