import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorsModule} from "./authors/authors.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BooksListComponent} from "./books-list/books-list.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthorsModule,
    DashboardComponent,
    BooksListComponent
  ],
  exports: [
    AuthorsModule,
    DashboardComponent,
    BooksListComponent
  ]
})
export class CoreModule { }
