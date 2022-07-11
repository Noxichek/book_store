import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { map, Observable } from 'rxjs';

import { UserService } from '../../core/services/user.service';

export class EmailValidator {
  public static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.checkIfEmailExists(control.value)
        .pipe(
          map((result: boolean) => {
            return result ? { emailAlreadyExist: true } : null;
          }),
        );
    };
  }
}
