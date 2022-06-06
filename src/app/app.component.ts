import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app_book';
  @HostBinding('class') className = 'defaultMode';

  changeTheme() {
    const darkClassName = 'darkMode';
    const defaultName = 'defaultMode'

    this.className = this.className === defaultName ? darkClassName : defaultName
  }
}
