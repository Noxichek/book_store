import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCardModule } from '../book-card/book-card.module';

import { BookListRoutingModule } from './book-list-routing.module';
import { BookListComponent } from './components/book-list-component/book-list.component';


@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BookCardModule,
    BookListRoutingModule,
  ],
  exports: [
    // FIXME export isn't necessary here
    BookListComponent,
  ],
})
// FIXME The name of module and folder name don't match
export class BookListModule {}
