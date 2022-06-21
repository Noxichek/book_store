import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthorsComponent } from './components/authors-component/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorInfoComponent } from './components/author-info-component/author.info.component';
import { AuthorsContainerComponent } from './containers/authors-container/authors-container.component';
import { AuthorInfoContainerComponent } from './containers/author-info-container/author-info-container.component';
import { AuthorInfoViewComponent } from './views/author-info-view/author-info-view.component';


@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorInfoComponent,
    AuthorsContainerComponent,
    AuthorInfoContainerComponent,
    AuthorInfoViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,

    AuthorsRoutingModule,
  ],
})
export class AuthorsModule {}
