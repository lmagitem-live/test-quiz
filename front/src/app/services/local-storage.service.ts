import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public getData<T>(key: string): T {
    const jsonData = localStorage.getItem(key);
    return jsonData ? JSON.parse(jsonData) : undefined;
  }

  public saveData<T>(key: string, data: T): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }
}
