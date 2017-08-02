import { Component, OnInit } from '@angular/core';
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

  constructor(private gameContentService: GameContentService) {
    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170102";

    this.gameContentService.loadGame(puzzleId)
      .then(p => this.puzzle = p);
  }

  ngOnInit() {
  }

}
