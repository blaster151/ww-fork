import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class GameInitializationServiceService {

  public orchestrator = new ReplaySubject<LaunchSteps>(3);

  constructor() {
    this.orchestrator.next(LaunchSteps.SpinnerShowing);

    // Begin loading content
    this.orchestrator.next(LaunchSteps.ContentLoading);

    this.orchestrator.subscribe(step => {
      if (step == LaunchSteps.ContentLoaded)
      {
        setTimeout(() => {
          this.orchestrator.next(LaunchSteps.GameShowing);
        }, 200);
      }
      else if (step == LaunchSteps.FontDetermined)
      {
        setTimeout(() => {
          this.orchestrator.next(LaunchSteps.DisplayingWordlistFont);
        }, 200);
      }
    });
  }
}

export enum LaunchSteps {
  SpinnerShowing,
  ContentLoading,
  ContentLoaded,
  GameShowing,
  DisplayOutmostContainer,
  
  FillAllAvailableSpaceRequested,
  EnlargeFontToFitRequested,
  
  FontDetermined,
  DisplayingWordlistFont
}