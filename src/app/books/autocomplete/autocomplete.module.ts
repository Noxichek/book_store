import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteOptionDirective } from '../directives/autocomplete-option.directive';

import { AutocompleteFilterComponent } from './autocomplete-filter/autocomplete-filter.component';

@NgModule({
  declarations: [
    AutocompleteFilterComponent,
    AutocompleteOptionDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
  ],
  exports: [
    AutocompleteFilterComponent,
    AutocompleteOptionDirective,
  ],
})
export class AutocompleteModule {}
