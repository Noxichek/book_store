import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';
import { AuthorInfoViewComponent } from './views/author-info-view/author-info-view.component';

const routes: Routes = [
  { path: '', component: AuthorsContainerComponent },
  { path: ':id', component: AuthorInfoViewComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthorsRoutingModule {}
