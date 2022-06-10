import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksResolver } from '../book/resolvers/books.resolver';

import { BookListComponent } from './components/book-list-component/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';


const routes = [
  // FIXME Need to discus
  { path: '', component: BookListComponent, resolve: { resolveData: BooksResolver }},
  { path: ':id', component: BookInfoComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BookListRoutingModule {}
