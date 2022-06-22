import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PriceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return control.value < 0 ? { incorrectPrice: true } : null;
};
