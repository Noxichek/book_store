import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPassword
(dependedControlName: string, comparedControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dependedControl = control.get(dependedControlName)?.value;
    const comparedControl = control.get(comparedControlName)?.value;

    return dependedControl !== comparedControl ? { confirmPassword: true } : null;
  };
}
