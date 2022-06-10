import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // eslint-disable-next-line @typescript-eslint/typedef
  { path: 'books', loadChildren: () => import('./books/books.module').then((x) => x.BooksModule) },
  // eslint-disable-next-line @typescript-eslint/typedef
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

