import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function compareDateValidator
(dependedControlName: string, comparedControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.get(dependedControlName)?.value && control.get(comparedControlName)?.value) {
      const dependedControl = new Date(control.get(dependedControlName)?.value).getTime();
      const comparedControl = new Date(control.get(comparedControlName)?.value).getTime();

      return dependedControl > comparedControl ? { comparedDate: true } : null;
    }

    return null;
  };
}
