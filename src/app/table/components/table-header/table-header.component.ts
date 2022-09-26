import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sortable-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements OnInit {

  @Input()
  public field?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
