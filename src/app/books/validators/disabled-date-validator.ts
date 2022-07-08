import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function disabledDateValidator(minPrice: string, maxPrice: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const minPriceControl = control.get(minPrice)?.value === null;
    const maxPriceControl = control.get(maxPrice)?.value === null;

    return (minPriceControl || maxPriceControl) ? { disableDate: true } : null;
  };
}
