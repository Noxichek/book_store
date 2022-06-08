import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from "./components/book-list-component/book-list.component";
import {BookCardModule} from "../book-card/book-card.module";
import {BookListRoutingModule} from "./book-list-routing.module";


@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BookCardModule,
    BookListRoutingModule
  ],
  exports: [
    BookListComponent
  ]
})
export class BookListModule {
}
