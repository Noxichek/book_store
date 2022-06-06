import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import { MatTabsModule} from "@angular/material/tabs";
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookCardComponent } from './book-card/book-card.component';
import {MatCardModule} from "@angular/material/card";
import { BooksListComponent } from './books-list/books-list.component';
import { AuthorsComponent } from './authors/authors.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookCardComponent,
    BooksListComponent,
    AuthorsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatTabsModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
