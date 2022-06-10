import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCardModule } from '../book-card/book-card.module';
import { LayoutModule } from '../layout/layout.module';


@NgModule({
  declarations: [],
  imports: [
    // FIXME CommonModule isn't necessary here
    CommonModule,
    // FIXME Why we have import in core?
    BookCardModule,
    // FIXME It's better to import to App
    LayoutModule,
  ],
  exports: [
    BookCardModule,
    LayoutModule,
  ],
})
export class CoreModule {}
