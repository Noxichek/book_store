import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginErrorStateMatcher } from '../../validators/login-error-state-matcher';
import { confirmPassword } from '../../validators/confirm-password.validator';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LocalstorageKeys } from '../../../core/interfaces/localstorage-keys';
import { IUser } from '../../../core/interfaces/user-interface';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {

  public readonly registrationForm!: FormGroup;
  public matcher =  new LoginErrorStateMatcher();
  public isModal = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _localStorageService: LocalStorageService,
  ) {
    this.registrationForm = this._initRegistrationForm();
  }

  public createNewUser(): void {
    if(this._checkIfEmailExist()) {
      this.isModal = true;
    } else {
      const customUser = {
        email: this.registrationForm.get('email')?.value,
        password: this.registrationForm.get('password')?.value,
      };
      const users = this._localStorageService.getData<IUser[]>(LocalstorageKeys.usersKey) || [];

      this._localStorageService.setData(LocalstorageKeys.usersKey, [...users, customUser]);
      this.registrationForm.reset();
    }
  }

  public modalView(): void {
    this.isModal = false;
  }

  private _checkIfEmailExist(): boolean {
    const users = this._localStorageService.getData<IUser[]>(LocalstorageKeys.usersKey) || [];
    const customUserEmail = this.registrationForm.value.email;

    return users.some((user: IUser) => {
      return user.email === customUserEmail;
    });
  }

  private _initRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: confirmPassword('password', 'confirmPassword') });
  }

}
