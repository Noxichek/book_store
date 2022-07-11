import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public getData<T>(key: string): T {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : '';
  }

  public setData<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
