import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BookResolveService } from '../book/services/book.resolve.service';

import { BookListComponent } from './components/book-list-component/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';


const routes = [
  { path: '', component: BookListComponent, resolve: {resolveData: BookResolveService }},
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
