import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostServiceService {

  private _data = signal<any>(null);

  setData(value: any) {
    this._data.set(value);
  }

  get data() {
    return this._data;
  }


}
