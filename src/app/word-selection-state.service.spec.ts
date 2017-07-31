import { TestBed, inject } from '@angular/core/testing';

import { WordSelectionStateService } from './word-selection-state.service';

describe('WordSelectionStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordSelectionStateService]
    });
  });

  it('should be created', inject([WordSelectionStateService], (service: WordSelectionStateService) => {
    expect(service).toBeTruthy();
  }));
});
