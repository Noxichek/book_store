import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './components/authors-component/authors.component';
import { AuthorInfoComponent } from './components/author-info-component/author.info.component';

const routes: Routes = [
  { path: '', component: AuthorsComponent },
  { path: ':id', component: AuthorInfoComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthorsRoutingModule {}
