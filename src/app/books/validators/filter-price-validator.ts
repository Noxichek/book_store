import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function filterPriceValidator
(dependedControlName: string, comparedControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minPriceControl = control.get(dependedControlName)?.value;
    const maxPriceControl = control.get(comparedControlName)?.value;

    return minPriceControl > maxPriceControl ? { minPriceGreaterMaxPrice: true } : null;
  };
}
