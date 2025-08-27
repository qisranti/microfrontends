import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  sharedMessage = signal('Initial shared message from lib');
  constructor() {
    console.log('SharedService instantiated');
  }
}
