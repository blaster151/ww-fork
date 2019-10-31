import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
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

      console.log('JCB GameLaunchComponent setting reload to false then to true');
      
      setTimeout(() => { this._reload = false; });
      setTimeout(() => { this._reload = true; }, 250);
  }

  constructor(private gameContentService: GameContentService, private cdr: ChangeDetectorRef, private elem: ElementRef) {
    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170102";

    this.gameContentService.loadGame(puzzleId)
      .then(p => {this.puzzle = p; console.log('JCB Game content loaded onetime'); setTimeout(() => {
        console.log('JCB Setting _reload to true');
        this._reload = true;
      }, 0); });

    // FIres before resize, as we would hope
    window.addEventListener("orientationchange", (rsp) => {
      console.log('JCB in orientationchange handler');

      resizeCtr = 0;
      this.reload();

      // I don't know if this helps anything
      return false;
    }, false);

    let resizeCtr = 0;
    window.addEventListener("resize", (rsp) => {
      console.log('JCB in GameLauncher resize handler', window.innerWidth, window.innerHeight);
      //console.log(this.elem.nativeElement.getBoundingClientRect());

      resizeCtr++;
      if (resizeCtr > 2)
      {
        console.log('JCB short-circuiting redraw after 2 times')
        return false;
      }

      this.reload();

      // I don't know if this helps anything
      return false;
    }, false);
  }

  ngOnDestroy() {
    console.log('JCB GameLaunch ngOnDestroy');
    
  }

  ngOnInit() {
  }

  gameplayInitialized() {
    console.log('JCB gameplay emitted gameplayInitialized event');

    (<any>document.querySelector('#gameLaunchContainer')).style.display = 'inherit';
    
    // Give game a second to redraw itself
    setTimeout(() => {
      console.log('JCB hiding spinner');
      (<any>document.querySelector('app-spinner')).style.display = 'none';
    }, 100);
  }
}
