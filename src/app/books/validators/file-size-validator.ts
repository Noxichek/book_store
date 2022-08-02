import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSizeMB: number): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (!file) {
      return null;
    }

    const fileSize = file.size;
    const fileSizeInKB = Math.round(fileSize / 1024);

    return fileSizeInKB > maxSizeMB * 1024 ? { incorrectImageSize: true } : null;
  };
}
