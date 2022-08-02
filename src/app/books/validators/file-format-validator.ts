import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileFormatValidator(format: string[]): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    if (!control.value || typeof control.value === 'string') {
      return null;
    }

    const file = control.value.name.split('.');
    const type = file[file.length - 1];

    return !format.includes(type) ? { incorrectFormat: true } : null;
  };
}
