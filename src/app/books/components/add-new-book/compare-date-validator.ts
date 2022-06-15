import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function compareDate(dependedControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dependedControlValue = new Date(control.parent?.get('releaseDate')!.value).getTime();
    const controlValue = new Date(control.value).getTime();

    return controlValue > dependedControlValue ? { error: 'wrong date' } : null;
  };
}
