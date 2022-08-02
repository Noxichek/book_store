import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { ToastrModule } from 'ngx-toastr';

import { environment } from '../../environments/environment';

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
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
