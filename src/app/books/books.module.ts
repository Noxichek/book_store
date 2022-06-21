import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { BookModule } from '../../libs/book';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookInfoComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    BookModule,
    ScrollingModule,
  ],
})
export class BooksModule {}
