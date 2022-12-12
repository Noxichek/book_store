import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BookModule } from '../../libs/book';

import { AutocompleteModule } from '../authors/autocomplete';


import { BookListComponent } from './components/book-list/book-list.component';
import { BookInfoComponent } from './components/book-info/book-info.component';
import { BookInfoContainerComponent } from './containers/book-info-container/book-info-container.component';
import { BookInfoViewComponent } from './views/book-info-view/book-info-view.component';
import { BookListContainerComponent } from './containers/book-list-container/book-list-container.component';
import { AddNewBookComponent } from './components/add-new-book/add-new-book.component';
import { PriceComponent } from './components/price/price.component';
import { BooksRoutingModule } from './books-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { DateFiltersComponent } from './components/date-filters/date-filters.component';
import { AuthorsFilterComponent } from './components/authors-filter/authors-filter.component';
import { LoadFileComponent } from './components/load-file/load-file.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookInfoComponent,
    BookInfoContainerComponent,
    BookInfoViewComponent,
    BookListContainerComponent,
    AddNewBookComponent,
    PriceComponent,
    FiltersComponent,
    DateFiltersComponent,
    AuthorsFilterComponent,
    LoadFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatAutocompleteModule,

    BooksRoutingModule,
    BookModule,
    ScrollingModule,
    FormsModule,
    AutocompleteModule,
    FontAwesomeModule,
    MatProgressBarModule,
  ],
})
export class BooksModule {}
