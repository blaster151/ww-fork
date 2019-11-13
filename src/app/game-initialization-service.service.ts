import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class GameInitializationServiceService {

  public orchestrator = new ReplaySubject<LaunchSteps>(3);

  constructor() {
    console.log('GIS ctr');

    this.orchestrator.next(LaunchSteps.SpinnerShowing);

    // Begin loading content
    this.orchestrator.next(LaunchSteps.ContentLoading);

    this.orchestrator.subscribe(step => {
      if (step == LaunchSteps.ContentLoaded)
      {
        setTimeout(() => {
          console.log('nextING from orchestrator');
          this.orchestrator.next(LaunchSteps.GameShowing);
        }, 1000);
      }
      else if (step == LaunchSteps.FontDetermined)
      {
        setTimeout(() => {
          this.orchestrator.next(LaunchSteps.DisplayingWordlistFont);
        }, 1000);
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
  
  FontDetermined,
  DisplayingWordlistFont
}