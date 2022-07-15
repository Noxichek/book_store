import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'books',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./books/books.module').then((x) => x.BooksModule),
  },
  { path: 'authors',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./authors/authors.module').then((x) => x.AuthorsModule),
  },
  { path: 'login',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./login/login.module').then((x) => x.LoginModule),
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

