import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookCardComponent} from "./components/book-card-component/book-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { BookInfoComponent } from '../books/components/book-info/book-info.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    BookCardComponent,
    BookInfoComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        RouterModule
    ],
  exports: [
    BookCardComponent,
    BookInfoComponent
  ]
})
export class BookCardModule { }
