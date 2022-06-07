import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorsComponent} from "./components/authors-component/authors.component";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [AuthorsComponent]
})
export class AuthorsModule { }
