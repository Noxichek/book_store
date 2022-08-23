import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { IAuthor } from '../../../authors/interfaces/author.interface';
import { Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-authors-filter',
  templateUrl: './authors-filter.component.html',
  styleUrls: ['./authors-filter.component.scss'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: AuthorsFilterComponent,
  }],
})
export class AuthorsFilterComponent implements OnInit, MatFormFieldControl<IAuthor[]> {

  private static _nextId = 0;

  public stateChanges = new Subject<void>();

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

  private _value!: IAuthor[];

  @Input()
  public set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  public get placeholder() {
    return this._placeholder;
  }

  private _placeholder!: string;


  ngControl: NgControl | null = null;
  focused: boolean = false;
  empty!: boolean;
  shouldLabelFloat: boolean = true;
  required!: boolean;
  disabled!: boolean;
  errorState!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;

  setDescribedByIds(ids: string[]): void {
    throw new Error('Method not implemented.');
  }

  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
