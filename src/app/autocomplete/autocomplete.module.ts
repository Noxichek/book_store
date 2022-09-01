import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteOptionDirective } from './directives/autocomplete-option.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteNoResultDirective } from './directives/autocomplete-no-result.directive';
import {MatButtonModule} from "@angular/material/button";
import { CreateOptionFormComponent } from './components/create-option-form/create-option-form.component';
import { AuthorNoResultComponent } from './components/author-no-result/author-no-result.component';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteOptionDirective,
    AutocompleteNoResultDirective,
    CreateOptionFormComponent,
    AuthorNoResultComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatInputModule,
        MatButtonModule,
    ],
    exports: [
        AutocompleteComponent,
        AutocompleteOptionDirective,
        AutocompleteNoResultDirective,
        AuthorNoResultComponent,
    ],
})
export class AutocompleteModule {}
