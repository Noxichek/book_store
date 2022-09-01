import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-no-result',
  templateUrl: './author-no-result.component.html',
  styleUrls: ['./author-no-result.component.scss']
})
export class AuthorNoResultComponent implements OnInit {

  @Input()
  public inputValue?: string;

  constructor() {}

  public ngOnInit(): void {}

  public openModal(): void {
    console.log('open');
  }
}
