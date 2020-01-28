import { Component, OnInit, Input, ContentChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { IWordSelectionChange, IWordWithCoordinates } from './../ww.interfaces';
import { WordSelectionStateService } from './../word-selection-state.service';
import 'rxjs/add/operator/filter';

import { LocalStorageService } from './../local-storage.service';
import { TimerService } from '../timer.service';
import { ISavedPuzzle } from '../ww.interfaces';
import { Puzzle } from '../models/puzzle';
import { EndOfGameCelebrationService } from '../end-of-game-celebration.service';
import { BiggestPossibleSquareDirective } from '../biggest-possible-square.directive';
import { GameInitializationServiceService, LaunchSteps } from 'app/game-initialization-service.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  @Input() puzzle: Puzzle;
  private foundWords: IWordWithCoordinates[] = [];
  public wordBeingSelected: IWordWithCoordinates = null;

  public _showGrid = false;
  public _showWordList = false;

  public isPaused: boolean = false;

  @Output() viewInitialized = new EventEmitter();
  @ContentChild(BiggestPossibleSquareDirective) private biggestPossibleSquareDirective: BiggestPossibleSquareDirective;

  constructor(private wordSelectionStateService: WordSelectionStateService,
    private localStorageService: LocalStorageService,
    private timerService: TimerService,
    private endOfGameCelebrationService: EndOfGameCelebrationService,
    private gameInitializationService: GameInitializationServiceService,
    private elementRef: ElementRef) {
    this.wordSelectionStateService = wordSelectionStateService;

    (<any>document).addEventListener('touchmove', function (e) {
      e.preventDefault();
      return false;
    });

    this.gameInitializationService.orchestrator.subscribe(step => {
      if (step == LaunchSteps.GameShowing)
      {
        this._showGrid = true;

        setTimeout(() => {
          this._showWordList = true;

          setTimeout(() => {
            this.gameInitializationService.orchestrator.next(LaunchSteps.FillAllAvailableSpaceRequested);

            setTimeout(() => {
              this.gameInitializationService.orchestrator.next(LaunchSteps.EnlargeFontToFitRequested);
            }, 0);
          }, 10);
        }, 10);
      }
    });
  }

  pause = () => {
    this.isPaused = true; this.timerService.isPaused = true;

    this.persistProgress();
  }
  unpause = () => {
    this.isPaused = false; this.timerService.isPaused = false;
  }

  onWordIndicated(x: IWordSelectionChange) {
    const coords = this.puzzle.getCoordinates(x.word.word);

    x.word.isFound = true;
    this.foundWords.push({ word: x.word.word, coords: coords });
    coords.forEach(cell => cell.cell.isCircled = true);
  }

  onWordSelected(wordSelectionChange: IWordSelectionChange) {
    if (wordSelectionChange.selected) {
      this.puzzle.highlightLetter(wordSelectionChange.word.word.substring(0, 1));
    }
    else
      this.puzzle.highlightLetter(wordSelectionChange.word.word.substring(0, 1), false);
  }

  ngAfterViewInit() {
    this.viewInitialized.emit();

    this.gameInitializationService.orchestrator.next(LaunchSteps.FontDetermined);
  }

  ngOnInit() {
    this.wordSelectionStateService.currentPuzzle = this.puzzle;

    const wordsSelectedInEnglish = this.wordSelectionStateService.wordsSelected
      .map(e => { return { englishWord: e.map(c => c.letter).join(''), word: e } });

    const puzzleWordsFound = wordsSelectedInEnglish
      .map(w => {
        return {
          word: w, wordInPuzzle: this.puzzle.words.find(
            pw => pw.word === w.englishWord || pw.word === w.englishWord.split('').reverse().join(''))
        };
      })
      .filter(w => w.wordInPuzzle != null);

    let foundOrder = 0;
    puzzleWordsFound.subscribe(w => {
      w.wordInPuzzle.isFound = true;
      w.wordInPuzzle.foundOrder = ++foundOrder;

      const coords = w.word.word.map(c => this.puzzle.getCoordinatesForCell(c));
      this.foundWords.push({ word: w.wordInPuzzle.word, coords: coords });

      w.word.word.forEach(cell => cell.isCircled = true);

      // Subscribe to add local storage persistence
      this.persistProgress();
    });

    puzzleWordsFound.subscribe(w => {
      if (this.puzzle.isComplete()) {
        this.timerService.isPaused = true;
      }
    });

    this.wordSelectionStateService.selectionChanges.subscribe(w => {
      if (w === null || w.length === 0) {
        this.wordBeingSelected = null;
        return;
      }

      const wordAsString = w.map(c => c.letter).join('');
      const coords = w.map(c => this.puzzle.getCoordinatesForCell(c));

      this.wordBeingSelected = { word: wordAsString, coords: coords };
    });

    // When a word completes, we're not mid-selection anymore
    this.wordSelectionStateService.wordsSelected.subscribe(w => {
      this.wordBeingSelected = null;
    });

    // Check for persisted version
    const key = this.puzzle.title;
    const savedPuzzle = this.localStorageService.retrieve<ISavedPuzzle>(key);

    if (savedPuzzle) {

      savedPuzzle.foundWords.forEach(w => {
        const coords = this.puzzle.getCoordinates(w);
        const wordInPuzzle = this.puzzle.words.find(pw => pw.word === w);

        wordInPuzzle.isFound = true;
        this.foundWords.push({ word: w, coords: coords });
        coords.forEach(cell => cell.cell.isCircled = true);
      });
      
      this.timerService.setElapsedTime(savedPuzzle.elapsedTime);

      if (savedPuzzle.foundWords.distinct().length === this.puzzle.words.length) {
        this.endOfGameCelebrationService.offerToReset(this.puzzle)
          .then(result => {
            if (result) {
              this.resetRequested();
            }
          });
      }
    }

    this.timerService.intervals.subscribe(i => this.persistProgress());
  }

  persistProgress() {
    const key = this.puzzle.title;
    this.localStorageService.store(
      key,
      {
        elapsedTime: this.timerService.getElapsedTime(),
        foundWords: this.foundWords.map(fw => fw.word)
      });
  }

  onMouseMove() {
    if (!this.wordSelectionStateService.isSelectingWord)
      return;
    
    // Mouse left the grid area
    this.wordSelectionStateService.doneWithWord();
  }

  resetRequested() {
    this.puzzle.words.forEach(w => w.isFound = false);
    this.foundWords.length = 0;
    this.puzzle.getAllCells().forEach(c => c.isCircled = false);

    // Resort words
    this.puzzle.words = this.puzzle.words.orderBy(w => w.word);

    this.timerService.resetElapsedTime();
    this.persistProgress();
  }
}