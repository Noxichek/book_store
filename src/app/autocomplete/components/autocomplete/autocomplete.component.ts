import {
  Component, ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self, TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

import {debounceTime, pluck, Subject, takeUntil} from 'rxjs';

import { AutocompleteOptionDirective } from '../../directives/autocomplete-option.directive';
import { AutocompleteNoResultDirective } from '../../directives/autocomplete-no-result.directive';
import {AuthorService} from "../../../authors/services/author.service";
import {IAddAuthor} from "../../../authors/interfaces/add-author.interface";
import {IAuthor} from "../../../authors/interfaces/author.interface";


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: AutocompleteComponent,
    },
  ],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class AutocompleteComponent<T = any> implements
  OnInit,
  OnDestroy,
  ControlValueAccessor,
  MatFormFieldControl<T[]> {

  private static _nextId = 0;

  @ContentChild(AutocompleteOptionDirective, { static: true, read: TemplateRef })
  public autocompleteOptions?: TemplateRef<AutocompleteOptionDirective>;

  @ContentChild(AutocompleteNoResultDirective, { static : true, read: TemplateRef })
  public autocompleteNoResult?: TemplateRef<AutocompleteNoResultDirective>;

  @Input()
  public withCreate?: boolean;
  @Input()
  public key?: string;
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
  @HostBinding()
  public id = `filter-id-${AutocompleteComponent._nextId++}`;
  @HostBinding('class.floated')

  public stateChanges = new Subject<void>();
  public errorState = false;
  public controlType = 'autocomplete';
  public focused: boolean = false;
  public autocomplete = new FormControl('');
  public isDropDownOpen = false;
  public isAddOptionFormOpen = false;

  private _value!: T[];
  private _placeholder!: string;
  private _destroy = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private readonly _formBuilder: FormBuilder,
    private readonly _elementRef: ElementRef,
    private readonly _authorService: AuthorService,
  ) {
    if(this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public get empty(): boolean {
    return false;
  }

  public get shouldLabelFloat(): boolean {
    return true;
  }

  public ngOnInit(): void {
    this._listenInputAutocomplete();
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
  public registerOnChange(onChange: (value: T | string| boolean | number) => void): void {
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

  public setValueIntoInput(option: T): void {
    const displayedValue = this.displayWith(option);
    const value: T | string| boolean | number = !!this.key
      // @ts-ignore
      ? option[this.key]
      : option;

    this.autocomplete.setValue(displayedValue);
    this._onChange(value);
    this.isDropDownOpen = false;
  }

  public openOptionForm(): void {
    this.isAddOptionFormOpen = true;
  }

  public saveOption($event: IAddAuthor): void {
    console.log($event);
    this.autocomplete.setValue(`${$event.first_name} ${$event.last_name}`)
    this._authorService.addNewAuthor($event)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe();

    this.isAddOptionFormOpen = false;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (value: T | string| boolean | number): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

  private _listenInputAutocomplete(): void {
    this.autocomplete.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy),
      )
      .subscribe((value: string | null) => {
        this.filterData.emit(value);
      });
  }

}
