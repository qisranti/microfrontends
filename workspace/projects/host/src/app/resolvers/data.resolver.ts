import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { HostServiceService } from '../shared/services/host-service.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<void> {
  constructor(private shared: HostServiceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.shared.setData((route.paramMap.get('Message')!));
    return this.shared.data();
  }
}

export const dataResolverProvider: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(HostServiceService).data();
};
