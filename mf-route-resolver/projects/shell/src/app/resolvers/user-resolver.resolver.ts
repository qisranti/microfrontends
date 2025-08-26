import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<string> {
  resolve() {
    return of('ISrael Quisbert');
  }
}