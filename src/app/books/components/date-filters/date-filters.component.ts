import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { releaseDateValidator } from '../../validators/release-date-validator';
import { compareDateValidator } from '../../validators/compare-date-validator';
import { IDateFilter } from '../../interfaces/date-filter-interface';

@Component({
  selector: 'app-date-filters',
  templateUrl: './date-filters.component.html',
  styleUrls: ['./date-filters.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateFiltersComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => DateFiltersComponent),
    },
  ],
})
export class DateFiltersComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public readonly dateFilterForm!: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(private readonly _formBuilder: FormBuilder) {
    this.dateFilterForm = this._initForm();
  }

  public ngOnInit(): void {
    this._listenOnDateValueChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public registerOnChange(onChange: (value: Date) => void): void {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this._touchFn = onTouched;
  }

  public writeValue(dates: IDateFilter): void {
    if(dates) {
      this.dateFilterForm.get('writingDate')?.setValue(dates.writingDate);
      this.dateFilterForm.get('releaseDate')?.setValue(dates.releaseDate);
    }
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.dateFilterForm.errors;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (date: Date): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

  private _initForm(): FormGroup {
    return this._formBuilder.group({
      writingDate: [null],
      releaseDate: [null],
    }, {
      validators: [
        releaseDateValidator('releaseDate'),
        compareDateValidator('writingDate', 'releaseDate'),
      ],
    });
  }

  private _listenOnDateValueChanges(): void {
    this.dateFilterForm.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value: Date | null) => {
        if (value) {
          this._onChange(value);
        }
      });
  }

}
