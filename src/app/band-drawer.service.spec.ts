import { TestBed, inject } from '@angular/core/testing';

import { BandDrawerService } from './band-drawer.service';

describe('BandDrawerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BandDrawerService]
    });
  });

  it('should be created', inject([BandDrawerService], (service: BandDrawerService) => {
    expect(service).toBeTruthy();
  }));
});
