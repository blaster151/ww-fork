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
export class GameLaunchComponent implements OnInit {
  public puzzle: Puzzle;

  public _showSpinner = false;
  public _showGame = false;

  private reload() {
    // (<any>document.querySelector('app-spinner')).style.display = 'inherit';
    // (<any>document.querySelector('#gameLaunchContainer')).style.display = 'none';

    //   console.log('JCB GameLaunchComponent setting reload to false then to true');
      
    //   setTimeout(() => { this._showGame = false; });
    //   setTimeout(() => { this._showGame = true; }, 250);
  }

  constructor(private gameContentService: GameContentService, private cdr: ChangeDetectorRef, private elem: ElementRef, private gameInitializationService: GameInitializationService) {
    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170102";

    this.gameInitializationService.orchestrator.subscribe(step => {
      console.log('Heard step ', step);

      if (step == LaunchSteps.ContentLoading)
      {
        this.gameContentService.loadGame(puzzleId)
        .then(p => {this.puzzle = p; console.log('JCB Game content loaded onetime');
          console.log('   saw content finish');
          this.gameInitializationService.orchestrator.next(LaunchSteps.ContentLoaded);
        });
      }
      else if (step == LaunchSteps.SpinnerShowing)
      {
        console.log('Heard SpinnerShowing');
        this._showSpinner = true;
      }
      else if (step == LaunchSteps.GameShowing)
      {
        this._showSpinner = false;
        this._showGame = true;
      }
    });

    // FIres before resize, as we would hope
    window.addEventListener("orientationchange", (rsp) => {
      console.log('JCB in orientationchange handler');

      resizeCtr = 0;
      // this.reload();
    }, false);

    let resizeCtr = 0;
    window.addEventListener("resize", (rsp) => {
      console.log('JCB in GameLauncher resize handler', window.innerWidth, ' ', window.innerHeight);
      console.log('JCB in GameLauncher resize handler', window.outerWidth, ' ', window.outerHeight, window.pageXOffset, window.pageYOffset);
      console.log(JSON.stringify(this.elem.nativeElement.getBoundingClientRect()));

      console.log('   before timeout');
      console.log(JSON.stringify(document.querySelector('#gameLaunchContainer') ? document.querySelector('#gameLaunchContainer').getBoundingClientRect() : {}));
      console.log(JSON.stringify(document.querySelector('#wordGridContainer') ? document.querySelector('#wordGridContainer').getBoundingClientRect() : {}));


      setTimeout(() => {
        console.log('   in timeout');
        console.log(JSON.stringify(document.querySelector('#gameLaunchContainer') ? document.querySelector('#gameLaunchContainer').getBoundingClientRect() : {}));
        console.log(JSON.stringify(document.querySelector('#wordGridContainer') ? document.querySelector('#wordGridContainer').getBoundingClientRect() : {}));
      }, 0);
      setTimeout(() => {
        console.log('   in timeout');
        console.log(JSON.stringify(document.querySelector('#gameLaunchContainer') ? document.querySelector('#gameLaunchContainer').getBoundingClientRect() : {}));
        console.log(JSON.stringify(document.querySelector('#wordGridContainer') ? document.querySelector('#wordGridContainer').getBoundingClientRect() : {}));
      }, 1500);

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

  ngAfterViewInit() {
    console.log('gameLaunch ngAfterViewInit (is this significant at all)');
  }

  gameplayInitialized() {
    console.log('Received gameplay emitted gameplayInitialized event');

    // (<any>document.querySelector('#gameLaunchContainer')).style.display = 'inherit';
    
    // // Give game a second to redraw itself
    // setTimeout(() => {
    //   console.log('JCB hiding spinner');
    //   (<any>document.querySelector('app-spinner')).style.display = 'none';
    // }, 100);
  }
}
