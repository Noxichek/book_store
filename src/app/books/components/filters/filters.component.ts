import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { compareDateValidator } from '../../validators/compare-date-validator';
import { releaseDateValidator } from '../../validators/release-date-validator';
import { MyErrorStateMatcher } from '../../validators/error-state-matcher';
import { disabledDateValidator } from '../../validators/disabled-date-validator';
import { ISearchBookData } from '../../interfaces/search-book-data-interface';
import { filterPriceValidator } from '../../validators/filter-price-validator';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output()
  public searchByAuthor = new EventEmitter<ISearchBookData>;

  @Output()
  public clearFilters = new EventEmitter<void>;

  public readonly formFilter!: FormGroup;
  public authors: IAuthor[] = [];
  public matchersMap: { releaseDate: MyErrorStateMatcher } = {
    releaseDate: new MyErrorStateMatcher('releaseDate', 'date'),
  };

  public matchersMapCompareDate: { comparedDate: MyErrorStateMatcher } = {
    comparedDate: new MyErrorStateMatcher('comparedDate', 'date'),
  };

  public matchersMapPriceFilter: { minPriceGreaterMaxPrice: MyErrorStateMatcher } = {
    minPriceGreaterMaxPrice: new MyErrorStateMatcher('minPriceGreaterMaxPrice', 'price'),
  };

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _formBuilder: FormBuilder,
  ) {
    this.formFilter = this._initFilterForm();
  }

  public get minControl(): FormControl {
    return this.formFilter.get('price')?.get('minPriceFilter') as FormControl;
  }

  public ngOnInit(): void {
    this._getAllAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public clearForm(): void {
    this.formFilter.reset();
    this.clearFilters.emit();
  }

  public filterSearch(): void {
    this.searchByAuthor.emit(this._getFormData());
  }

  private _getFormData(): ISearchBookData {
    let authorLastName;

    if (this.formFilter.value.authorFilter !== '' && this.formFilter.value.authorFilter !== null) {
      authorLastName = this.formFilter.value.authorFilter.split(' ')[1];
    }

    return {
      author: authorLastName,
      minPrice: this.formFilter.get('price')?.get('minPriceFilter')?.value,
      maxPrice: this.formFilter.get('price')?.get('maxPriceFilter')?.value,
      writingDate: this.formFilter.value.writingDateFilter,
      releaseDate: this.formFilter.value.releaseDateFilter,
      title: this.formFilter.value.titleFilter,
    };
  }

  private _getAllAuthors(): void {
    this._authorService.getAllAuthors().pipe(
      pluck('authors'),
      takeUntil(this._destroy$),
    )
      .subscribe((authors: IAuthor[]) => {
        this.authors = authors;
      });
  }

  private _initFilterForm(): FormGroup {
    return this._formBuilder.group({
      authorFilter: [null],
      price: this._formBuilder.group({
        minPriceFilter: [null, Validators.min(0)],
        maxPriceFilter: [null, Validators.min(0)],
      }, {
        validators: [
          disabledDateValidator('minPriceFilter', 'maxPriceFilter'),
          filterPriceValidator('minPriceFilter', 'maxPriceFilter'),
        ],
      }),
      date: this._formBuilder.group({
        writingDateFilter: [null],
        releaseDateFilter: [null],
      }, {
        validators: [
          releaseDateValidator('releaseDateFilter'),
          compareDateValidator('writingDateFilter', 'releaseDateFilter'),
        ],
      }),
      titleFilter: [null],
    });
  }

}
