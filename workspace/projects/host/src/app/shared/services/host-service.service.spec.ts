/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HostServiceService } from './host-service.service';

describe('Service: HostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostServiceService]
    });
  });

  it('should ...', inject([HostServiceService], (service: HostServiceService) => {
    expect(service).toBeTruthy();
  }));
});
