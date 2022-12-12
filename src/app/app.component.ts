import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import firebase from 'firebase/compat';

import { slideInAnimation } from './core/animations/app.animations';
import { AuthService } from './login/services/auth.service';


import User = firebase.User;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'app_book';
  @HostBinding('class') public className = 'defaultMode';

  private _destroy$ = new Subject<void>();

  constructor(private readonly _authService: AuthService) {}

  public ngOnInit(): void {
    this.getSignInUser();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getSignInUser(): void {
    this._authService.getSignInUser()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((user: User | null) => {
        if (user) {
          this._authService.currentUser = user;
        }
      });
  }

  public changeTheme(): void {
    const darkClassName = 'darkMode';
    const defaultName = 'defaultMode';

    this.className = this.className === defaultName ? darkClassName : defaultName;
  }

}
