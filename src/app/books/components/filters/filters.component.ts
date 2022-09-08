import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { map, Observable, pluck, share, startWith, Subject, switchMap, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { MyErrorStateMatcher } from '../../validators/error-state-matcher';
import { disabledDateValidator } from '../../validators/disabled-date-validator';
import { filterPriceValidator } from '../../validators/filter-price-validator';
import { ISearchBookData } from '../../interfaces/search-book-data-interface';
import { IQueryParameters } from '../../interfaces/query-parameters-interface';
import { IAddAuthor } from '../../../authors/interfaces/add-author.interface';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { Utils } from '../../../core/utils/utils';

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
  public authors$!: Observable<IAuthor[]>;
  public filteredAuthors$!: Observable<IAuthor[]>;

  public matchersMapPriceFilter: { minPriceGreaterMaxPrice: MyErrorStateMatcher } = {
    minPriceGreaterMaxPrice: new MyErrorStateMatcher('minPriceGreaterMaxPrice', 'price'),
  };

  private readonly _authorQueryChange$ = new Subject<string | null>();
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _authorService: AuthorService,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
  ) {
    this.formFilter = this._initFilterForm();
    this.authors$ = this._getAllAuthors()
      .pipe(
        share(),
      );
    this.filteredAuthors$ = this._getFilteredAuthors();
  }

  public get minPriceControl(): AbstractControl | null {
    return this.formFilter.get('price')!.get('minPriceFilter');
  }

  public get maxPriceControl(): AbstractControl | null {
    return this.formFilter.get('price')!.get('maxPriceFilter');
  }

  public get priceControl(): AbstractControl | null {
    return this.formFilter.get('price');
  }

  public get titleControl(): AbstractControl | null {
    return this.formFilter.get('titleFilter');
  }

  public get authorControl(): AbstractControl | null {
    return this.formFilter.get('authorFilter');
  }

  public ngOnInit(): void {
    this._getQueryParams();
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
    const queryParameters = this._buildQueryParameters();

    this._router.navigate(
      [],
      {
        queryParams: queryParameters,
      });
    this.searchByAuthor.emit(this._getFormData());
  }

  public filterData(value: string | null) {
    this._authorQueryChange$.next(value);
  }

  public getAuthorData(data: IAddAuthor): void {
    this._authorService.addNewAuthor(data)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((author: IAuthor) => {
        this.filterData(author.lastName);
        this.authorControl?.setValue(Utils.getFullName(author));
      });
  }

  public displayWithFn(option: IAuthor): string {
    return Utils.getFullName(option);
  }

  private _getQueryParams(): void {
    const queryParameters = this._activatedRoute.snapshot.queryParams;
    this._setDataIntoForm(queryParameters);
  }

  private _buildQueryParameters(): IQueryParameters {
    return {
      author: this.authorControl?.value.split(' ')[1],
      minPrice: this.minPriceControl?.value,
      maxPrice: this.maxPriceControl?.value,
      writingDate: this.formFilter.get('date')?.value?.writingDate,
      releaseDate: this.formFilter.get('date')?.value?.releaseDate,
      title: this.titleControl?.value,
    };
  }

  private _setDataIntoForm(parameters: Params): void {
    this.minPriceControl?.setValue(parameters['minPrice']);
    this.maxPriceControl?.setValue(parameters['maxPrice']);
    this.titleControl?.setValue(parameters['title']);
  }

  private _getFormData(): ISearchBookData {
    let authorLastName;

    if (this.formFilter.value.authorFilter !== '' && this.formFilter.value.authorFilter !== null) {
      [, authorLastName] = this.formFilter.value.authorFilter.split(' ');
    }

    return {
      author: authorLastName,
      minPrice: this.minPriceControl?.value,
      maxPrice: this.maxPriceControl?.value,
      writingDate: this.formFilter.get('date')?.value?.writingDate,
      releaseDate: this.formFilter.get('date')?.value?.releaseDate,
      title: this.titleControl?.value,
    };
  }

  private _getAllAuthors(): Observable<IAuthor[]> {
    return this._authorService.getAuthorsFromPageNumber(1, 100)
      .pipe(
        pluck('authors'),
      );
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
      date: [null],
      titleFilter: [null],
    });
  }

  private _getFilteredAuthors(): Observable<IAuthor[]> {
    return this._authorQueryChange$
      .pipe(
        startWith(''),
        switchMap((query: string | null) => {

          return this.authors$
            .pipe(
              map((authors: IAuthor[]) => {
                if (query) {
                  return authors.filter((author: IAuthor) => {
                    return Utils.getFullName(author).toLowerCase().includes(query.toLowerCase());
                  });
                }

                return [...authors];
              }),
            );
        }),
      );
  }
}
