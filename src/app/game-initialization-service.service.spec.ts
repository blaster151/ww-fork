import { TestBed, inject } from '@angular/core/testing';

import { GameInitializationServiceService } from './game-initialization-service.service';

describe('GameInitializationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameInitializationServiceService]
    });
  });

  it('should be created', inject([GameInitializationServiceService], (service: GameInitializationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
