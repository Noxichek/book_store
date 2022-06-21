import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksResolver } from '../../libs/book/resolvers/books.resolver';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoViewComponent } from './views/book-info-view/book-info-view.component';


const routes = [
  { path: '', component: BookListComponent, resolve: { resolveData: BooksResolver }},
  { path: ':id', component: BookInfoViewComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BooksRoutingModule {}
