import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { map, Observable, pluck, startWith, Subject, takeUntil } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { AuthorService } from '../../../authors/services/author.service';
import { BookService } from '../../services/book.service';
import { GenreService } from '../../../genres/services/genre.service';
import { Utils } from '../../../core/utils/utils';
import { IGenre } from '../../../genres/interfaces/genre-interface';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { ICreateBookData } from '../../interfaces/create-book-data-interface';
import { compareDateValidator } from '../../validators/compare-date-validator';
import { MyErrorStateMatcher } from '../../validators/error-state-matcher';


@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss'],
})

export class AddNewBookComponent implements OnInit, OnDestroy {

  @ViewChild('genreInput')
  public genreInput: ElementRef<HTMLInputElement> | undefined;

  public readonly separatorKeysCodes = [ENTER, COMMA];
  public readonly form!: FormGroup;
  public matchersMap: { comparedDate: MyErrorStateMatcher } = {
    comparedDate: new MyErrorStateMatcher('comparedDate'),
  };
  public filteredAuthors!: Observable<IAuthor[]>;
  public filteredGenres!: Observable<IGenre[]>;
  public selectedGenres: IGenre[] = [];

  private readonly _destroy$ = new Subject<boolean>();
  private _genres: IGenre[] = [];
  private _authors: IAuthor[] = [];

  constructor(
    private readonly _authorService: AuthorService,
    private readonly _bookService: BookService,
    private readonly _formBuilder: FormBuilder,
    private readonly _genreService: GenreService,
    private readonly _toastrService: ToastrService,
  ) {
    this.form = this._initForm();
  }

  public ngOnInit(): void {
    this._getAllAuthors();
    this._getAllGenres();
    this._getFilteredAuthors();
    this._getFilteredGenres();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  public filterGenres(): IGenre[] {
    return this._genres.filter((element: IGenre) => {
      return !this.selectedGenres.some((value: IGenre) => element.id === value?.id);
    });
  }

  public displayAuthorFn(author: IAuthor): string {
    return author ? Utils.getAuthorFullName(author) : '';
  }

  public selected({ option: { value }}: MatAutocompleteSelectedEvent): void {
    this.selectedGenres.push(value);
    this.genreInput!.nativeElement.value = '';
  }

  public remove(genres: IGenre): void {
    const index = this.selectedGenres.indexOf(genres);

    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }

  public addNewBook(): void {
    const id = this.form.value.author.id;
    const data = this._getFormData();

    if (this.form.invalid) {
      return;
    }
    this._bookService.createBook(id, data)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this._toastrService.success('Successful added'));
  }

  public trackByFn(index: number, author: IAuthor): number {
    return author.id;
  }

  private _getFormData(): ICreateBookData {
    return {
      description: this.form.value.description,
      title: this.form.value.title,
      price: this.form.value.price,
      writing_date: this.form.value.writingDate,
      release_date: this.form.value.releaseDate,
    };
  }

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      author: ['', Validators.required],
      genres: [''],
      writingDate: [''],
      releaseDate: [''],
    }, { validators: compareDateValidator('writingDate', 'releaseDate') });
  }

  private _getAllAuthors(): void {
    this._authorService.getAllAuthors()
      .pipe(
        pluck('authors'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IAuthor[]) => {
        this._authors = response;
      });
  }

  private _getAllGenres(): void {
    this._genreService.getAllGenres()
      .pipe(
        pluck('genres'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IGenre[]) => {
        this._genres = response;
      });
  }

  private _filterAuthors(author: string): IAuthor[] {
    return this._authors.filter((element: IAuthor) => {
      return (Utils.getAuthorFullName(element).toLowerCase()).includes(author.toLowerCase());
    });
  }

  private _getFilteredAuthors(): Observable<IAuthor[]> {
    return this.filteredAuthors = this.form.get('author')!.valueChanges.pipe(
      startWith(''),
      map((value: string | IAuthor) => {
        return typeof value === 'string' ? value : Utils.getAuthorFullName(value);
      }),
      map((name: string) => name ? this._filterAuthors(name) : [...this._authors]),
    );
  }

  private _getFilteredGenres(): Observable<IGenre[]> {
    return this.filteredGenres = this.form.get('genres')!.valueChanges
      .pipe(
        startWith(''),
        map((value: string | IGenre) => typeof value === 'string' ? value : value.name),
        map((name: string) => {
          const unselectedGenres = this.filterGenres();

          return unselectedGenres.filter((genre: IGenre) => {
            return genre.name.toLowerCase().includes(name.toLowerCase());
          });
        }),
      );
  }

}
