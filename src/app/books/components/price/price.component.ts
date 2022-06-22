import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator, Validators,
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { PriceValidator } from '../../validators/price-validator';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PriceComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PriceComponent),
    },
  ],
})

export class PriceComponent implements ControlValueAccessor, OnInit, Validator, OnDestroy {

  public inputPrice = new FormControl(0, [Validators.required, PriceValidator]);

  private readonly _destroy$ = new Subject<boolean>();

  public ngOnInit(): void {
    this._listenOnPriceValueChanges();
  }

  public ngOnDestroy() {
    this._destroy$.next(true);
  }

  public onAdd() {
    this.inputPrice.setValue(this.inputPrice.value! + 1);
    this.inputPrice.markAsTouched();
  }

  public onRemove() {
    this.inputPrice.setValue(this.inputPrice.value! - 1);
    this.inputPrice.markAsTouched();
  }

  public registerOnChange(onChange: (value: number) => void): void {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this._touchFn = onTouched;
  }

  public writeValue(value: number): void {
    this.inputPrice.setValue(value);
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return control.value < 0 ? { incorrectPrice: true } : null;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (price: number): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

  private _listenOnPriceValueChanges() {
    this.inputPrice.valueChanges
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((value: number | null) => {
        this._onChange(value!);
      });
  }

}
