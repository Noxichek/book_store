import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  constructor(private _errorName: string, private _controlName?: string) {}

  public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null)
    : boolean {
    if (control?.touched) {
      return this._controlName ?
        !!form?.control.get(this._controlName)?.hasError(this._errorName) :
        !!form?.hasError(this._errorName);
    }

    return false;
  }
}
