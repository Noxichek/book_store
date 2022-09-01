import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteOptionDirective } from './directives/autocomplete-option.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteNoResultDirective } from './directives/autocomplete-no-result.directive';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteOptionDirective,
    AutocompleteNoResultDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteOptionDirective,
    AutocompleteNoResultDirective,
  ],
})
export class AutocompleteModule {}
