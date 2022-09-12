import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  Input,
  Output,
  ContentChild,
  HostBinding,
  ElementRef,
  EventEmitter,
  Optional,
  Self,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

import { debounceTime, first, Subject, takeUntil } from 'rxjs';

import { AutocompleteOptionDirective } from '../../directives/autocomplete-option.directive';
import { AutocompleteNoResultDirective } from '../../directives/autocomplete-no-result.directive';


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
})
export class AutocompleteComponent<T = any> implements OnChanges,
  OnInit,
  OnDestroy,
  ControlValueAccessor,
  MatFormFieldControl<T[]> {

  private static _nextId = 0;

  @Input()
  public withCreate?: boolean;
  @Input()
  public key?: string;
  @Input()
  public options!: T[] | null;
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
  public filterData = new EventEmitter<string | null>();

  @ContentChild(AutocompleteOptionDirective, { static: true, read: TemplateRef })
  public autocompleteOptions?: TemplateRef<AutocompleteOptionDirective>;

  @ContentChild(AutocompleteNoResultDirective, { static: true, read: TemplateRef })
  public autocompleteNoResult?: TemplateRef<AutocompleteNoResultDirective>;

  @HostBinding('id')
  public id = `filter-id-${AutocompleteComponent._nextId++}`;

  public focused = false;
  public isDropDownOpen = false;
  public errorState = false;
  public inputAutocomplete = new FormControl('');
  public stateChanges = new Subject<void>();
  public controlType = 'autocomplete';

  private _destroy = new Subject<void>();
  private _optionsChange$ = new Subject<void>();
  private _placeholder!: string;
  private _value!: T[];

  constructor(
    @Optional() @Self()
    public ngControl: NgControl,
    private readonly _elementRef: ElementRef,
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public get empty(): boolean {
    return false;
  }

  public get shouldLabelFloat(): boolean {
    return true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['options'].isFirstChange()) {
      this._optionsChange$.next();
    }
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

  public writeValue(value: T | string | boolean | number): void {
    if (!value) {
      this.inputAutocomplete.reset();
    }

    if (this.key) {
      this.filterData.emit('');

      this._optionsChange$
        .pipe(
          first(),
          takeUntil(this._destroy),
        )
        .subscribe(() => {
          const currentOption: T | undefined = this.options?.find((option: T) => {
            // @ts-ignore
            return option[this.key] === value;
          });
          if (currentOption) {
            this.inputAutocomplete.setValue(this.displayWith(currentOption), { emitEvent: false });
          }
        });

    } else if (
      typeof value !== 'string'
      && typeof value !== 'boolean'
      && typeof value !== 'number'
    ) {
      this.inputAutocomplete.setValue(this.displayWith(value), { emitEvent: false });
    }
  }

  public registerOnChange(onChange: (value: T | string | boolean | number) => void): void {
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

  public onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  public setValueIntoInput(option: T): void {
    const displayedValue = this.displayWith(option);
    const value: T | string | boolean | number = !!this.key
      // @ts-ignore
      ? option[this.key]
      : option;

    this.inputAutocomplete.setValue(displayedValue);
    this._onChange(value);
    this.isDropDownOpen = false;
  }

  // eslint-disable-next-line no-empty-function
  private _onChange = (value: T | string | boolean | number): void => {};
  // eslint-disable-next-line no-empty-function
  private _touchFn = (): void => {};

  private _listenInputAutocomplete(): void {
    this.inputAutocomplete.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy),
      )
      .subscribe((value: string | null) => {
        this.filterData.emit(value);
      });
  }

}
