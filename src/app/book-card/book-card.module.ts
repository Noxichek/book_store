import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { BookInfoComponent } from '../books/components/book-info/book-info.component';

import { BookCardComponent } from './components/book-card-component/book-card.component';
import { AuthorFullNamePipe } from './pipes/author.full.name.pipe';


@NgModule({
  declarations: [
    BookCardComponent,
    // FIXME BookInfo should be declared in books
    BookInfoComponent,
    AuthorFullNamePipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    // FIXME There isn't necessary to export RouterModule
    RouterModule,
  ],
  exports: [
    BookCardComponent,
    BookInfoComponent,
    // FIXME There isn't necessary to export AuthorFullNamePipe
    AuthorFullNamePipe,
  ],
})
export class BookCardModule {}
