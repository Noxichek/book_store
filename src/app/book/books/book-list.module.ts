import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from "./components/book-list-component/book-list.component";
import {BookCardModule} from "../../book-card/book-card.module";
import {RouterModule} from "@angular/router";

const routes = [
  {path: '', component: BookListComponent}
]

@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BookCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BookListComponent
  ]
})
export class BookListModule {
}
