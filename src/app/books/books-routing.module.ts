import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksResolver } from '../../libs/book/resolvers/books.resolver';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';


const routes = [
  { path: '', component: BookListComponent, resolve: { resolveData: BooksResolver }},
  { path: ':id', component: BookInfoComponent },
  { path: 'add/new-book', component: AddNewBookComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BooksRoutingModule {}
