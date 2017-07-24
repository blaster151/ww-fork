import { TestBed, inject } from '@angular/core/testing';

import { AxiosService } from './axios.service';

describe('AxiosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AxiosService]
    });
  });

  it('should be created', inject([AxiosService], (service: AxiosService) => {
    expect(service).toBeTruthy();
  }));
});
