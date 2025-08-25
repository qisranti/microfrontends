import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestServiceService {
  sharedMessage = signal('Hello from TestServiceService!');
  constructor() {
    console.log('TestServiceService created:', this);
  }
}
