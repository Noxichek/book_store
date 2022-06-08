import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookInfoComponent} from "./book/books/components/book-info/book-info.component";

const routes: Routes = [
  {path: 'books', loadChildren: () => import('./book/books/book-list.module').then(x => x.BookListModule)},
  {path: 'authors', loadChildren: () => import('./authors/authors.module').then(x => x.AuthorsModule)},
  {path: 'books/:id', component: BookInfoComponent},
  {path: '', redirectTo: 'books', pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
