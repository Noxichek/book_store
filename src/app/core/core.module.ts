import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardModule} from "../book-card/book-card.module";
import {LayoutModule} from "../layout/layout.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookCardModule,
    LayoutModule
  ],
  exports: [
    BookCardModule,
    LayoutModule,
  ]
})
export class CoreModule {
}
