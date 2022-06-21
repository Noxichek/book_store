import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { BookModule } from '../../libs/book';

import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BookInfoContainerComponent } from './containers/book-info-container/book-info-container.component';
import { BookInfoViewComponent } from './views/book-info-view/book-info-view.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookInfoComponent,
    BookInfoContainerComponent,
    BookInfoViewComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    BookModule,
    ScrollingModule,
  ],
})
export class BooksModule {}
