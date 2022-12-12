import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NgControl } from '@angular/forms';

import { MatFormFieldControl } from '@angular/material/form-field';

import { debounceTime, Subject, takeUntil } from 'rxjs';

import { Utils } from '../../../core/utils/utils';
import { IFullName } from '../../../core/interfaces/full-name-interface';


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
export class AuthorsFilterComponent<T extends IFullName> implements
  OnInit,
  OnDestroy,
  ControlValueAccessor,
  MatFormFieldControl<T[]> {

  private static _nextId = 0;

  @Input()
  public options: T[] = [];
  @Input()
  public displayWith!: (option: T) => string;
  @Input()
  public required!: boolean;
  @Input()
  public disabled!: boolean;
  @Input()
  public set value(value: T[]) {
    this._value = value;
    this.stateChanges.next();
  }
  public get value(): T[] {
    return this._value;
  }
  @Input()
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  public get placeholder(): string {
    return this._placeholder;
  }
  @Output()
  public filterData = new EventEmitter<string | null>;
  public get empty(): boolean {
    return false;
  }
  @HostBinding()
  public id = `authors-filter-id-${AuthorsFilterComponent._nextId++}`;
  @HostBinding('class.floated')
  public get shouldLabelFloat(): boolean {
    return true;
  }

  public stateChanges = new Subject<void>();
  public errorState = false;
  public controlType = 'authorFilter';
  public focused: boolean = false;
  public authorFilter = new FormControl('');
  public isDropDownOpen = false;

  private _value!: T[];
  private _placeholder!: string;
  private _destroy = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly _formBuilder: FormBuilder,
    private readonly _elementRef: ElementRef,
  ) {
    if(this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.authorFilter.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy),
      )
      .subscribe((value: string | null) => {
        this.filterData.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this.stateChanges.next();
    this.stateChanges.complete();
    this._destroy.next();
    this._destroy.complete();
  }

  public writeValue(value: T[]): void {
    this._value = value;
  }
  public registerOnChange(onChange: (value: T[]) => void): void {
    this._onChange = onChange;
  }
  public registerOnTouched(onTouched: () => void): void {
    this._touchFn = onTouched;
  }

  public setDescribedByIds(ids: string[]): void {
    // throw new Error('Method not implemented.');
  }

  public onContainerClick(event: MouseEvent): void {
    // throw new Error('Method not implemented.');
  }

  public onFocus(): void {
    this.isDropDownOpen = true;
  }

  public onBlur(): void {
    this.isDropDownOpen = false;
  }

  public onClick(event: any): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.onBlur();
    }
  }

  public setValueIntoInput(value: T): void {
    this.authorFilter.setValue(Utils.getFullName(value));
    this.isDropDownOpen = false;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (value: T[]): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

}
