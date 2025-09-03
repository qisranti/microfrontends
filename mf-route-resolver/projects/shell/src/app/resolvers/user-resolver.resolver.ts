import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

export const userResolver: ResolveFn<string> = () => {
  return of('Israel Quisbert');
};
