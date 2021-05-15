/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LabRequestService } from './lab-request.service';

describe('Service: LabRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabRequestService]
    });
  });

  it('should ...', inject([LabRequestService], (service: LabRequestService) => {
    expect(service).toBeTruthy();
  }));
});
