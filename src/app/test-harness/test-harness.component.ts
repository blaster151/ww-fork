import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import { ICellWithCoordinates } from './../ww.interfaces';
import { XmlToJsonService } from './../xml-to-json.service';
import { GameContentService } from './../game-content.service';
import { URLSearchParams } from '@angular/http';
import { PuzzleCell } from '../models/puzzleCell';
import { Puzzle } from '../models/puzzle';
import { Word } from 'app/models/word';
import { IWordWithCoordinates } from '../ww.interfaces';
import { EndOfGameCelebrationService } from '../end-of-game-celebration.service';

@Component({
  selector: 'app-test-harness',
  templateUrl: './test-harness.component.html',
  styleUrls: ['./test-harness.component.css']
})
export class TestHarnessComponent implements OnInit {
  public singleWord: Word = new Word("SAMPLE");
  public sampleWordList: Word[] = null;
  public foundWord: Word = new Word("EUREKA");
  public samplePuzzle: Puzzle = null;
  public xmlService: XmlToJsonService;
  public gameContentService: GameContentService;

  public sampleXmlToJson: any;
  public sampleLoadedGame: any;

  private sampleWordStraightR: ICellWithCoordinates[];
  private sampleWordStraightD: ICellWithCoordinates[];
  private sampleWordUL: ICellWithCoordinates[];
  private sampleWordUR: ICellWithCoordinates[];
  private sampleWordDR: ICellWithCoordinates[];
  private sampleWordDL: ICellWithCoordinates[];

  constructor(xmlService: XmlToJsonService, gameContentService: GameContentService, private endOfGameService: EndOfGameCelebrationService, viewContainerRef: ViewContainerRef) {
    this.xmlService = xmlService;
    this.gameContentService = gameContentService;

    this.sampleWordStraightR = [ { cell: null, row: 2, col: 2 }, { cell: null, row: 2, col: 4 } ];
    this.sampleWordStraightD = [ { cell: null, row: 5, col: 5 }, { cell: null, row: 6, col: 5 } ];

    this.sampleWordUL = [ { cell: null, row: 2, col: 2 }, { cell: null, row: 1, col: 1 } ];
    this.sampleWordUR = [ { cell: null, row: 2, col: 14 }, { cell: null, row: 1, col: 15 } ];
    this.sampleWordDR = [ { cell: null, row: 14, col: 1 }, { cell: null, row: 15, col: 2 } ];
    this.sampleWordDL = [ { cell: null, row: 14, col: 15 }, { cell: null, row: 15, col: 14 } ];

    this.endOfGameService.vcRef = viewContainerRef;
  }

  ngOnInit() {
    this.foundWord.isFound = true;

    this.sampleXmlToJson = JSON.stringify(this.xmlService.xmlStringToJson("<person><firstName casual='Yes'>Jeff</firstName></person>"));
    // this.gameContentService.loadGame("170106").then(g => {this.sampleLoadedGame = JSON.stringify(g.title);

    // });


    let urlsearchparams = new URLSearchParams(window.location.search.replace(/\//g, ""));
    let puzzleId = urlsearchparams.get('?puzzle');

    if (!puzzleId) puzzleId = "170109";

    this.gameContentService.loadGame(puzzleId).then(g => {this.sampleLoadedGame = JSON.stringify(g.title);
      this.sampleWordList = g.words;
      this.samplePuzzle = g;
    });
  }

  onLettersClicked(letter: string, x) {
  }

  previewEndGameModal() {
    this.endOfGameService.celebrate('example');
  }
}
