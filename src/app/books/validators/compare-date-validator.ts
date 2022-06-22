import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function compareDate(dependedControlName: string, comparedControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dependedControl = new Date(control.get(dependedControlName)?.value).getTime();
    const comparedControl = new Date(control.get(comparedControlName)?.value).getTime();

    return dependedControl > comparedControl ? { comparedDate: true } : null;
  };
}
