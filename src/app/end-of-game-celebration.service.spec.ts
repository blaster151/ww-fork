import { TestBed, inject } from '@angular/core/testing';

import { EndOfGameCelebrationService } from './end-of-game-celebration.service';

describe('EndOfGameCelebrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndOfGameCelebrationService]
    });
  });

  it('should be created', inject([EndOfGameCelebrationService], (service: EndOfGameCelebrationService) => {
    expect(service).toBeTruthy();
  }));
});
