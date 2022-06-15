import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSelectChange } from '@angular/material/select';

import { pluck, Subject, takeUntil } from 'rxjs';

import { AuthorService } from '../../../authors/services/author.service';
import { BookService } from '../../services/book.service';
import { GenreService } from '../../services/genre.service';
import { IGenre } from '../../interfaces/genre-interface';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { IBook } from '../../../../libs/book';

import { compareDate } from './compare-date-validator';


@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss'],
})

export class AddNewBookComponent implements OnInit, OnDestroy {

  public addOnBlur = true;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public genres: IGenre[] = [];

  public authors: IAuthor[] = [];
  public newBook!: IBook;
  public currentAuthor!: IAuthor;
  public form!: FormGroup;
  public authorId!: number;

  private readonly _destroy$ = new Subject<boolean>();

  constructor(
    private _authorService: AuthorService,
    private _bookService: BookService,
    private _formBuilder: FormBuilder,
    private _genreService: GenreService,
  ) {}

  public ngOnInit(): void {

    this.form = this._formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      genres: new FormControl(''),
      writingDate: new FormControl('', [compareDate('releaseDate')]),
      releaseDate: new FormControl(''),
    });

    this._authorService.getAllAuthors()
      .pipe(
        pluck('authors'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IAuthor[]) => {
        this.authors = response;
      });

    this._genreService.getAllGenres()
      .pipe(
        pluck('genres'),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IGenre[]) => {
        this.genres = response;
        console.log(this.genres);
      });

    this.form.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
  }


  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const finalValue = [...value];
      finalValue[0] = finalValue[0].toUpperCase();
      this.genres.push({ name: finalValue.join('') });
    }
    event.chipInput!.clear();
  }

  public remove(genres: IGenre): void {
    const index = this.genres.indexOf(genres);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  public addNewBook() {

    this.newBook = {
      description: this.form.get('description')?.value,
      author_id: this.authorId,
      title: this.form.get('title')?.value,
      price: this.form.get('price')?.value,
      genres: this.form.get('genres')?.value,
      writing_date: this.form.get('writingDate')?.value,
      release_date: this.form.get('releaseDate')?.value,
      author: {
        id: this.authorId,
        first_name: this.currentAuthor.first_name,
        last_name: this.currentAuthor.last_name,
      },
    };
    console.log(this.newBook);
    this._bookService.createBook(this.authorId, this.newBook)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
  }


  public getAuthorId({ value }: MatSelectChange): number {
    const [,authorLastName] = value.split(' ');

    this.currentAuthor = this.authors.find((element: IAuthor) => {
      return element.last_name === authorLastName;
    }) || {} as IAuthor;

    return this.authorId = this.currentAuthor!.id;
  }
}
