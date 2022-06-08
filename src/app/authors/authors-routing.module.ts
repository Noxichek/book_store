import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthorsComponent} from "./components/authors-component/authors.component";

const routes: Routes = [
  {path: '', component: AuthorsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthorsRoutingModule {
}
