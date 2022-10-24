import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import firebase from 'firebase/compat';

import { IUser } from '../../core/interfaces/user-interface';

import User = firebase.User;
import UserCredential = firebase.auth.UserCredential;


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isSessionActive = false;
  public currentUser: any = null;

  constructor(
    private readonly _auth: AngularFireAuth,
    private readonly _router: Router,
  ) {
    _auth.authState.subscribe((user: User | null) => this.currentUser = user);
  }

  public createNewUser(user: IUser) {
    return this._auth.
      createUserWithEmailAndPassword(user.email, user.password)
      .then((response: UserCredential) => {
        console.log(response);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  public signIn(email: string, password: string): void {
    this._auth.setPersistence('session')
      .then(() => {
        this._auth.
          signInWithEmailAndPassword(email, password)
          .then((userCredential: UserCredential) => {
            this.currentUser = userCredential.user;
            console.log(this.currentUser);
            this._router.navigate(['books']);
            this.isSessionActive = true;
          });
      });
  }
}
