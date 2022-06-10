import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // FIXME Transfer to Core
    BrowserModule,
    AppRoutingModule,
    // FIXME Transfer to Core
    BrowserAnimationsModule,
    CoreModule,
    // FIXME Isn't used
    MatButtonToggleModule,
    MatButtonModule,
    CommonModule,
    // FIXME Transfer to Core
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
