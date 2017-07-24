import { TestBed, inject } from '@angular/core/testing';

import { CheerioService } from './cheerio.service';

describe('CheerioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheerioService]
    });
  });

  it('should be created', inject([CheerioService], (service: CheerioService) => {
    expect(service).toBeTruthy();
  }));
});
