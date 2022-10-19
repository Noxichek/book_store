import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import { IUser } from '../../core/interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isSessionActive = false;

  constructor(
    private readonly _auth: Auth,
    private readonly _router: Router,
  ) {}

  public createNewUser(user: IUser): void {
    createUserWithEmailAndPassword(this._auth, user.email, user.password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  public signIn(email: string, password: string): void {
    signInWithEmailAndPassword(this._auth, email, password)
      .then((response) => {
        console.log(response);
        this._router.navigate(['books']);
        this.isSessionActive = true;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

}
