import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function releaseDateValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const releaseDate = new Date(control.get(controlName)?.value).getTime();
    const currentDate = Date.now();

    return releaseDate > currentDate ? { releaseDate: true } : null;
  };
}
