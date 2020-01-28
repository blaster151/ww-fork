import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Puzzle } from '../models/puzzle';
import { GameContentService } from '../game-content.service';
import { URLSearchParams } from '@angular/http';
import { GameInitializationServiceService as GameInitializationService, LaunchSteps } from 'app/game-initialization-service.service';

@Component({
  selector: 'app-game-launch',
  templateUrl: './game-launch.component.html',
  styleUrls: ['./game-launch.component.css']
})
export class GameLaunchComponent {
  public puzzle: Puzzle;

  public _showSpinner = false;
  public _showGame = false;

  constructor(private gameContentService: GameContentService, private gameInitializationService: GameInitializationService) {
    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170102";

    this.gameInitializationService.orchestrator.subscribe(step => {
      if (step == LaunchSteps.ContentLoading)
      {
        this.gameContentService.loadGame(puzzleId)
        .then(p => {
          this.puzzle = p;
          this.gameInitializationService.orchestrator.next(LaunchSteps.ContentLoaded);
        });
      }
      else if (step == LaunchSteps.SpinnerShowing)
      {
        this._showSpinner = true;
      }
      else if (step == LaunchSteps.GameShowing)
      {
        this._showSpinner = false;
        this._showGame = true;
      }
    });

    // Fires before resize, as we would hope
    window.addEventListener("orientationchange", (rsp) => {
      resizeCtr = 0;
    }, false);

    let resizeCtr = 0;
    window.addEventListener("resize", (rsp) => {
      resizeCtr++;
      if (resizeCtr > 2)
      {
        // Short-circuiting redraw after 2 times
        return false;
      }

      return false;
    }, false);
  }
}
