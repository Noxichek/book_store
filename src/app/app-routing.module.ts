import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

import { AuthGuard } from './core/guard/auth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'books',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./books/books.module').then((x) => x.BooksModule),
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'authors',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./authors/authors.module').then((x) => x.AuthorsModule),
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./login/login.module').then((x) => x.LoginModule),
  },
  {
    path: 'table',
    // eslint-disable-next-line @typescript-eslint/typedef
    loadChildren: () => import('./table/table.module').then((x) => x.TableModule),
    canActivate: [AngularFireAuthGuard, AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

