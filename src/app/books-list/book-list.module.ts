import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksListComponent} from "./books-list.component";
import {BookCardModule} from "../book-card/book-card.module";



@NgModule({
  declarations: [BooksListComponent],
  imports: [
    CommonModule,
    BookCardModule
  ],
  exports: [
    BooksListComponent
  ]
})
export class BookListModule { }
