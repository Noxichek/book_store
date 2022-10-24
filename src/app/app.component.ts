import { Component, HostBinding } from '@angular/core';

import { slideInAnimation } from './core/animations/app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {

  public title = 'app_book';
  @HostBinding('class') public className = 'defaultMode';

  public changeTheme(): void {
    const darkClassName = 'darkMode';
    const defaultName = 'defaultMode';

    this.className = this.className === defaultName ? darkClassName : defaultName;
  }

}
