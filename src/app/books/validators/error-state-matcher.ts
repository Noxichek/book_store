import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  constructor(private _errorName: string) {}

  public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null)
    : boolean {
    if (control?.touched) {
      return !!form?.hasError(this._errorName);
    }

    return false;
  }
}
