import { TestBed, inject } from '@angular/core/testing';

import { ArrayExtensionsService } from './array-extensions.service';

describe('ArrayExtensionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayExtensionsService]
    });
  });

  it('should be created', inject([ArrayExtensionsService], (service: ArrayExtensionsService) => {
    expect(service).toBeTruthy();
  }));
});
