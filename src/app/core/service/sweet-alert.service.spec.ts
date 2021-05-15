/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SweetAlertService } from './sweet-alert.service';

describe('Service: SweetAlert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SweetAlertService]
    });
  });

  it('should ...', inject([SweetAlertService], (service: SweetAlertService) => {
    expect(service).toBeTruthy();
  }));
});
