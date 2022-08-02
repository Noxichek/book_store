import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

import { Subject } from 'rxjs';

import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.scss'],
  providers: [],
})

export class LoadFileComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public downloadImage = new FormControl();
  public fileName = '';
  public faTimes = faTimes;
  public imageSrc: string | ArrayBuffer | null = '';

  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _ngControl: NgControl) {
    if (_ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  public ngOnInit() {
    if (this._ngControl.control?.validator) {
      this.downloadImage.addValidators(this._ngControl.control?.validator);
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public registerOnChange(onChange: () => void): void {
    this._onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this._touchFn = onTouched;
  }

  public writeValue(image: File): void {
    if (!image) {
      this.deleteImage();
    } else {
      this.downloadImage.setValue(image);
    }
  }

  public deleteImage(): void {
    this.downloadImage.reset();
    this.imageSrc = '';
    this.fileName = '';
  }

  public readURL(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files !== null) {
      const file = target.files[0];
      this.fileName = file.name;

      if (target.files && file) {
        const reader = new FileReader();

        reader.onload = () => this.imageSrc = reader.result;
        reader.readAsDataURL(file);

        this._onChange(file);
      }
    }
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (value: File): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

}
