import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { IDashboardItem } from '../../interfaces/dashboard.item.interface';
import { DASHBOARD_ITEMS } from '../../mocks/dashboard.items';
import { AuthService } from '../../../../app/login/services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  public dashboardItems = DASHBOARD_ITEMS;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _auth: AngularFireAuth,
  ) {}

  public logout() {
    this._auth.signOut().then(() => {
      this._authService.isSessionActive = false;
      this._router.navigate(['login']);
    });
  }

  public isSessionActive(): boolean {
    return this._authService.isSessionActive;
  }

  public changeActiveLink(item: IDashboardItem): void {
    this.dashboardItems.forEach((element: IDashboardItem) => element.selected = false);
    item.selected = true;
  }

}
