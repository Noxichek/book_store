import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule }     from '@angular/material/table';
import { MatListModule }      from '@angular/material/list';
import { MatCardModule }      from '@angular/material/card';
import { MatButtonModule }    from '@angular/material/button';

import { BookCardModule } from '../book-card/book-card.module';

import { AuthorsComponent }     from './components/authors-component/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorInfoComponent }  from './components/author-info-component/author.info.component';


@NgModule({
  declarations: [AuthorsComponent, AuthorInfoComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AuthorsRoutingModule,
    MatPaginatorModule,
    MatListModule,
    BookCardModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [AuthorsComponent],
})
export class AuthorsModule {}
