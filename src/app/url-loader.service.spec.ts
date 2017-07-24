import { TestBed, inject } from '@angular/core/testing';

import { UrlLoaderService } from './url-loader.service';

describe('UrlLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlLoaderService]
    });
  });

  it('should be created', inject([UrlLoaderService], (service: UrlLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
