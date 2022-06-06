import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ]
})
export class BookCardComponent implements OnInit {
  @Input() book: any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
