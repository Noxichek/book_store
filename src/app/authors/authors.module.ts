import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsComponent} from "./components/authors-component/authors.component";
import {MatTableModule} from "@angular/material/table";
import {AuthorsRoutingModule} from "./authors-routing.module";


@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    AuthorsRoutingModule
  ],
  exports: [AuthorsComponent]
})
export class AuthorsModule {
}
