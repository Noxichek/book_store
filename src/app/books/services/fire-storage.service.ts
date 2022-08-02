import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {

  constructor(private readonly _storage: AngularFireStorage) {}

  public pushFileToStorage(fileUpload: File) {
    const filePath = `images/${fileUpload.name}`;
    const uploadTask = this._storage.upload(filePath, fileUpload);

    return uploadTask.percentageChanges();
  }
}
