/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HostServiceProxyService } from './HostServiceProxy.service';

describe('Service: HostServiceProxy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostServiceProxyService]
    });
  });

  it('should ...', inject([HostServiceProxyService], (service: HostServiceProxyService) => {
    expect(service).toBeTruthy();
  }));
});
