import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AutocompleteOptionDirective } from './directives/autocomplete-option.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteNoResultDirective } from './directives/autocomplete-no-result.directive';
import { AuthorNoResultComponent } from './components/author-no-result/author-no-result.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteOptionDirective,
    AutocompleteNoResultDirective,
    AuthorNoResultComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteOptionDirective,
    AutocompleteNoResultDirective,
    AuthorNoResultComponent,
  ],
})
export class AutocompleteModule {}
