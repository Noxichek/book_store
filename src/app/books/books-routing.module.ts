import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksResolver } from '../../libs/book/resolvers/books.resolver';

import { BookInfoViewComponent } from './views/book-info-view/book-info-view.component';
import { BookListContainerComponent } from './containers/book-list-container/book-list-container.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';


const routes = [
  { path: '',
    component: BookListContainerComponent,
    resolve: { resolveData: BooksResolver },
  },
  { path: ':id',
    component: BookInfoViewComponent,
  },
  { path: 'add/new-book',
    component: AddNewBookComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BooksRoutingModule {}
