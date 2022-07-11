import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, of } from 'rxjs';

import { IUser, IUserSession } from '../interfaces/user-interface';
import { LocalstorageKeys } from '../interfaces/localstorage-keys';

import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _currentUserStream$ = new BehaviorSubject<IUser | null>(null);
  private _existingEmails = ['admin@admin.com', 'example@example.com'];

  public get currentUser(): IUser | null {
    return this._currentUserStream$.getValue();
  }

  public set currentUser(user: IUser | null) {
    this._currentUserStream$.next(user);
  }

  constructor(private readonly _localStorageService: LocalStorageService) {
    const userSession = _localStorageService.getData<IUserSession>(LocalstorageKeys.sessionKey);

    this.currentUser = userSession.user;
  }

  public initSession(user: IUser): void {
    const dateNow = new Date();

    this._localStorageService
      .setData(LocalstorageKeys.sessionKey, { user, sessionStartTime: dateNow });

    this.currentUser = user;
  }

  public checkIfEmailExists(email: string) {
    return of(this._existingEmails.some((currentEmail: string) => currentEmail === email))
      .pipe(
        delay(2000),
      );
  }

  public isSessionActive(): boolean {
    return !!this._localStorageService.getData<IUserSession>('currentSession').user.email;
  }
}
