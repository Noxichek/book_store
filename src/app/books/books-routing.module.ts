import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksResolver } from '../../libs/book/resolvers/books.resolver';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';


const routes = [
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
export class BooksRoutingModule {}
