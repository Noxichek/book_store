import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsComponent} from "./components/authors-component/authors.component";
import {MatTableModule} from "@angular/material/table";
import {AuthorsRoutingModule} from "./authors-routing.module";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AuthorsRoutingModule,
    MatPaginatorModule
  ],
  exports: [AuthorsComponent]
})
export class AuthorsModule {
}
