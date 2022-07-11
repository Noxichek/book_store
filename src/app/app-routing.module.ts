import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: 'books',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./books/books.module').then((x) => x.BooksModule),
    canActivate: [AuthGuard],
  },
  { path: 'authors',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./authors/authors.module').then((x) => x.AuthorsModule),
    canActivate: [AuthGuard],
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

