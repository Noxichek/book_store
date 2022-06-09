import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AuthorsComponent } from './components/authors-component/authors.component';
import { AuthorsRoutingModule } from './authors-routing.module';



@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AuthorsRoutingModule,
    MatPaginatorModule,
  ],
  exports: [AuthorsComponent],
})
export class AuthorsModule {}
