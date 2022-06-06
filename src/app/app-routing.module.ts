import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksListComponent} from "./books-list/books-list.component";
import {AuthorsComponent} from "./authors/authors.component";

const routes: Routes = [
  {path: 'books', component: BooksListComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: '', component: AuthorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
