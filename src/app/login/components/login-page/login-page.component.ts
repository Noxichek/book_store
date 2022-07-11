import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginErrorStateMatcher } from '../../validators/login-error-state-matcher';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { UserService } from '../../../core/services/user.service';
import { EmailValidator } from '../../validators/email-validator';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  public readonly loginForm!: FormGroup;
  public matcher = new LoginErrorStateMatcher();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _localStorageService: LocalStorageService,
    private readonly _userService: UserService,
    private readonly _router: Router,
  ) {
    this.loginForm = this._initLoginForm();
  }

  public signIn(): void {
    this._router.navigate(['books']);
  }

  private _initLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: ['',
        [Validators.required, Validators.email],
        [EmailValidator.createValidator(this._userService)]],
      password: ['', Validators.required],
    });
  }

}
