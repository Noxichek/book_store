import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ApiRequestInterceptor } from './interceptors/api-request.interceptor';

const INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiRequestInterceptor,
  multi: true,
};

@NgModule({
  declarations: [],
  imports: [
    ToastrModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ToastrModule,
  ],
  providers: [
    INTERCEPTOR,
  ],
})
export class CoreModule {}
