import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginErrorStateMatcher } from '../../validators/login-error-state-matcher';
import { AuthService } from '../../services/auth.service';


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
    private readonly _authService: AuthService,
  ) {
    this.loginForm = this._initLoginForm();
  }

  public signIn(): void {
    this._authService.signIn(this.loginForm.value.email, this.loginForm.value.password);
  }

  private _initLoginForm(): FormGroup {
    return this._formBuilder.group({
      email: ['',
        [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

}
