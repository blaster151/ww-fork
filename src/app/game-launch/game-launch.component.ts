import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Puzzle } from '../models/puzzle';
import { GameContentService } from '../game-content.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-game-launch',
  templateUrl: './game-launch.component.html',
  styleUrls: ['./game-launch.component.css']
})
export class GameLaunchComponent implements OnInit {
  public puzzle: Puzzle;

  public _reload = false;

  private reload() {
    (<any>document.querySelector('app-spinner')).style.display = 'inherit';
    (<any>document.querySelector('#gameLaunchContainer')).style.display = 'none';

      setTimeout(() => { this._reload = false; });
      setTimeout(() => { this._reload = true; }, 100);
  }

  constructor(private gameContentService: GameContentService, private cdr: ChangeDetectorRef) {
    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170102";

    this.gameContentService.loadGame(puzzleId)
      .then(p => {this.puzzle = p; this._reload = true; });

    // FIres before resize, as we would hope
    window.addEventListener("orientationchange", (rsp) => {
      console.log('in orientationchange handler');

      this.reload();

      // I don't know if this helps anything
      return false;
    }, false);

    window.addEventListener("resize", (rsp) => {
      console.log('in resize handler');

      this.reload();

      // I don't know if this helps anything
      return false;
    }, false);
  }

  ngOnInit() {
  }

  gameplayInitialized() {
    console.log('gameplay emitted gameplayInitialized event');

    (<any>document.querySelector('#gameLaunchContainer')).style.display = 'inherit';
    
    // Give game a second to redraw itself
    setTimeout(() => {
      (<any>document.querySelector('app-spinner')).style.display = 'none';
    }, 100);
  }
}
