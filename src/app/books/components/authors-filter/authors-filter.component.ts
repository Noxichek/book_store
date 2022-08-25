import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostBinding,
  Input, OnChanges,
  OnInit,
  Optional, Output,
  Self, SimpleChanges, ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NgControl } from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';

import { Subject, takeUntil } from 'rxjs';

import { IAuthor } from '../../../authors/interfaces/author.interface';
import { Utils } from '../../../core/utils/utils';


@Component({
  selector: 'app-authors-filter',
  templateUrl: './authors-filter.component.html',
  styleUrls: ['./authors-filter.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: AuthorsFilterComponent,
    },
  ],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AuthorsFilterComponent implements
  OnInit,
  OnChanges,
  ControlValueAccessor,
  MatFormFieldControl<IAuthor[]> {

  private static _nextId = 0;

  public stateChanges = new Subject<void>();
  public errorState = false;
  public controlType = 'authorFilter';
  public focused: boolean = false;
  public authorFilter = new FormControl('');
  public isDropDownOpen = false;

  @Input()
  public set filteredData(value: IAuthor[]) {
    this._filteredData = value;
  }

  public get filteredData(): IAuthor[] {
    return this._filteredData;
  }

  @Input()
  public required!: boolean;

  @Input()
  public disabled!: boolean;

  @HostBinding()
  public id = `authors-filter-id-${AuthorsFilterComponent._nextId++}`;

  @Input()
  public set value(value: IAuthor[]) {
    this._value = value;
    this.stateChanges.next();
  }

  public get value(): IAuthor[] {
    return this._value;
  }

  @Output()
  public filterData = new EventEmitter<string>;

  @ViewChild('input')
  public input!: ElementRef;

  @ViewChild('options')
  public options!: ElementRef;

  private _value!: IAuthor[];
  private _allAuthors!: IAuthor[];
  private _filteredData!: IAuthor[];
  private _placeholder!: string;
  private _destroy = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _formBuilder: FormBuilder,
    private _eref: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    if(this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public writeValue(value: IAuthor[]): void {
    this._value = value;
  }
  public registerOnChange(onChange: (value: IAuthor[]) => void): void {
    this._onChange = onChange;
  }
  public registerOnTouched(onTouched: () => void): void {
    this._touchFn = onTouched;
  }

  @Input()
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  public get placeholder() {
    return this._placeholder;
  }

  public get empty(): boolean {
    return false;
  }

  @HostBinding('class.floated')
  public get shouldLabelFloat(): boolean {
    return true;
  }

  public setDescribedByIds(ids: string[]): void {
    // throw new Error('Method not implemented.');
  }

  public onContainerClick(event: MouseEvent): void {
    // throw new Error('Method not implemented.');
  }

  public ngOnInit(): void {
    this.authorFilter.valueChanges
      .pipe(takeUntil(this._destroy))
      .subscribe((value) => {
        if (value) {
          this.filterData.emit(value);
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    this._value = this._filteredData;
  }

  public ngOnDestroy(): void {
    this.stateChanges.next();
    this.stateChanges.complete();
    this._destroy.next();
    this._destroy.complete();
  }

  public onFocus(): void {
    this.isDropDownOpen = true;
  }

  public onBlur(): void {
    this.isDropDownOpen = false;
  }

  public onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.onBlur();
    }
  }

  public setValueIntoInput(value: IAuthor): void {
    this.authorFilter.setValue(Utils.getAuthorFullName(value));
    this.isDropDownOpen = false;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (value: IAuthor[]): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

}
