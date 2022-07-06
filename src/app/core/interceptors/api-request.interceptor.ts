import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
// @ts-ignore
import { camelCase, mapKeys } from 'lodash';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {

  public intercept
  (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<Response>) => {
        if (event instanceof HttpResponse) {
          this._convertBodyToCamelCase(event);
          this._convertBodyToCamelCase(event.body);
        }

        return event;
      }),
    );
  }

  private _convertArrayObjectsToCamelCase(value: any[]): any {
    return value.map((element: any) => {
      if (Array.isArray(element)) {
        return this._convertArrayObjectsToCamelCase(element);
      } else if (typeof element === 'object') {
        return this._convertObjectToCamelCase(element);
      }

      return element;
    });
  }

  private _convertObjectToCamelCase(value: {}) {
    return mapKeys(value, (v: unknown, key: string) => camelCase(key));
  }

  private _convertBodyToCamelCase(body: any) {
    Object.keys(body).forEach((key: string) => {
      if (Array.isArray(body[key])) {
        body[key] = this._convertArrayObjectsToCamelCase(body[key]);
      } else if (typeof body[key] === 'object') {
        body[key] = this._convertObjectToCamelCase(body[key]);
      }
    });
  }
}
