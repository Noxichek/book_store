import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // FIXME Add new line
  public title = 'app_book';
  @HostBinding('class') public className = 'defaultMode';

  public changeTheme(): void {
    const darkClassName = 'darkMode';
    const defaultName = 'defaultMode';

    this.className = this.className === defaultName ? darkClassName : defaultName;
  }
  // FIXME Add new line
}
