import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../../../../app/core/services/local-storage.service';
import { IUserSession } from '../../../../app/core/interfaces/user-interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router,
  ) {
    this.isSessionActive();
  }

  public logout() {
    this._localStorageService.removeData('currentSession');
    this._router.navigate(['login']);
  }

  public isSessionActive(): boolean {
    return !!this._localStorageService.getData<IUserSession>('currentSession').user.email;
  }

}
