import { TestBed, inject } from '@angular/core/testing';

import { GameContentService } from './game-content.service';

describe('GameContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameContentService]
    });
  });

  it('should be created', inject([GameContentService], (service: GameContentService) => {
    expect(service).toBeTruthy();
  }));
});
