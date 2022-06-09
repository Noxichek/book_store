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
    BookInfoComponent,
    AuthorFullNamePipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    BookCardComponent,
    BookInfoComponent,
    AuthorFullNamePipe,
  ],
})
export class BookCardModule {}
