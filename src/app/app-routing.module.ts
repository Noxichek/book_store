import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from "./book-list/components/book-list-component/book-list.component";
import {AuthorsComponent} from "./authors/components/authors-component/authors.component";

const routes: Routes = [
  {path: 'books', component: BookListComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: '', component: AuthorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
