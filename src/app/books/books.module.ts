import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

import { BookModule } from '../../libs/book';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { BooksRoutingModule } from './books-routing.module';


@NgModule({
  declarations: [
    BookListComponent,
    BookInfoComponent,
    AddNewBookComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    BookModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatNativeDateModule,
  ],
})
export class BooksModule {}
