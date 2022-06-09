import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'books', loadChildren: () => import('./books/book-list.module').then((x) => x.BookListModule) },
  { path: 'authors', loadChildren: () => import('./authors/authors.module').then((x) => x.AuthorsModule) },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
