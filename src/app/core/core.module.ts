import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsModule} from "../authors/authors.module";
import {BookCardModule} from "../book-card/book-card.module";
import {LayoutModule} from "../layout/layout.module";
import {BookListModule} from "../book-list/book-list.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthorsModule,
    BookCardModule,
    BookListModule,
    LayoutModule
  ],
  exports: [
    AuthorsModule,
    BookCardModule,
    LayoutModule,
    BookListModule
  ]
})
export class CoreModule {
}
