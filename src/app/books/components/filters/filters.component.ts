import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {BehaviorSubject, map, pluck, Subject, switchMap, takeUntil, tap} from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { MyErrorStateMatcher } from '../../validators/error-state-matcher';
import { disabledDateValidator } from '../../validators/disabled-date-validator';
import { ISearchBookData } from '../../interfaces/search-book-data-interface';
import { filterPriceValidator } from '../../validators/filter-price-validator';
import { Utils } from '../../../core/utils/utils';
import { IQueryParameters } from '../../interfaces/query-parameters-interface';
import { IAddAuthor } from '../../../authors/interfaces/add-author.interface';

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
  public filteredAuthors = new BehaviorSubject<IAuthor[]>([]);

  public matchersMapPriceFilter: { minPriceGreaterMaxPrice: MyErrorStateMatcher } = {
    minPriceGreaterMaxPrice: new MyErrorStateMatcher('minPriceGreaterMaxPrice', 'price'),
  };

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _changeDetectorRef: ChangeDetectorRef,
  ) {
    this.formFilter = this._initFilterForm();
  }

  public get minPriceControl(): FormControl {
    return this.formFilter.get('price')?.get('minPriceFilter') as FormControl;
  }

  public get maxPriceControl(): FormControl {
    return this.formFilter.get('price')?.get('maxPriceFilter') as FormControl;
  }

  public get priceControl(): FormControl {
    return this.formFilter.get('price') as FormControl;
  }

  public get titleControl(): FormControl {
    return this.formFilter.get('titleFilter') as FormControl;
  }

  public get authorControl(): FormControl {
    return this.formFilter.get('authorFilter') as FormControl;
  }

  public ngOnInit(): void {
    this._getAllAuthors();
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
    this.filteredAuthors.next(!!value
      ? this.authors.filter((author: IAuthor) => {
        return Utils.getFullName(author).toLowerCase().includes(value.toLowerCase());
      })
      : [...this.authors]);
  }

  public getAuthorData(data: IAddAuthor): void {
    this.authorControl.setValue(`${data.first_name} ${data.last_name}`);

    this._authorService.addNewAuthor(data)
      .pipe(
        map((value: IAddAuthor) => {
          this.authors.push(value as unknown as IAuthor);
          this.authors = [...this.authors];
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
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
      [,authorLastName] = this.formFilter.value.authorFilter.split(' ');
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

  private _getAllAuthors(): void {
    this._authorService.getAuthorsFromPageNumber(1, 100).pipe(
      pluck('authors'),
      tap((authors: IAuthor[]) => {
        this.authors = authors;
        this.filteredAuthors.next([...authors]);
      }),
      switchMap(() => this._activatedRoute.queryParams),
      pluck('author'),
      takeUntil(this._destroy$),
    )
      .subscribe((authorLastName: string) => {
        this._filterAuthorsByLastName(authorLastName);
      });
  }

  private _filterAuthorsByLastName(authorLastName: string): void {
    const currentAuthor = this.authors.find((author: IAuthor) => {
      return author.lastName === authorLastName;
    });
    if (currentAuthor) {
      this.formFilter.get('authorFilter')?.setValue(Utils.getFullName(currentAuthor));
    }
    if(this.formFilter.valid) {
      this.searchByAuthor.emit(this._getFormData());
    }
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

}
