import { Component, Input } from '@angular/core';

import { IAuthor } from '../../interfaces/author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})

export class AuthorsComponent {

  @Input()
  public authors!: IAuthor[];

}
