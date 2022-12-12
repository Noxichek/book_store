import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginErrorStateMatcher } from '../../validators/login-error-state-matcher';
import { confirmPassword } from '../../validators/confirm-password.validator';
import { IUser } from '../../../core/interfaces/user-interface';
import { AuthService } from '../../services/auth.service';

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
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
    this.registrationForm = this._initRegistrationForm();
  }

  public createNewUser(): void {
    const user: IUser = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
    };

    this._authService.createNewUser(user);
    this._router.navigate(['login']);
  }

  private _initRegistrationForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: confirmPassword('password', 'confirmPassword') });
  }

}
