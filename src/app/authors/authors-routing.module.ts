import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorInfoComponent } from './components/author-info-component/author.info.component';
import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';

const routes: Routes = [
  { path: '', component: AuthorsContainerComponent },
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
