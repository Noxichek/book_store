import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsComponent} from "./components/authors-component/authors.component";
import {MatTableModule} from "@angular/material/table";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: AuthorsComponent}
]

@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  exports: [AuthorsComponent]
})
export class AuthorsModule {
}
