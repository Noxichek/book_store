import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IMeta } from '../../../../libs/pagination';
import { IPaginatedMeta } from '../../interfaces/paginated-meta.interface';

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
  public goTo: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();
  @Output()
  public next: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();
  @Output()
  public previous: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();
  @Output()
  public changeElements: EventEmitter<IPaginatedMeta> = new EventEmitter<IPaginatedMeta>();

  public elementsPerPage = 5;
  public options: number[] = [5, 10, 25, 50];
  public pages: number[] = [];
  public current = 1;

  public onGoTo(page: number): void {
    this.pages = [];
    if (this.current !== page) {
      const meta = { page: page, elementsPerPage: this.elementsPerPage };

      this.goTo.emit(meta);
      this.current = page;
    }
  }
  public onNext(): void {
    const meta = { page: this.current, elementsPerPage: this.elementsPerPage };

    this.pages = [];
    this.current++;
    this.next.emit(meta);
  }
  public onPrevious(): void {
    const meta = { page: this.current, elementsPerPage: this.elementsPerPage };

    this.pages = [];
    this.current--;
    this.previous.next(meta);
  }

  public changeElementsPerPage(elementsPerPage: string) : void {
    const meta = { page: this.current, elementsPerPage: this.elementsPerPage };

    this.pages = [];
    this.elementsPerPage = Number(elementsPerPage);
    this.changeElements.emit(meta);
  }

}
