import { Injectable, EventEmitter } from '@angular/core';
import { ICellWithCoordinates } from './ww.interfaces';
import { PuzzleCell } from './models/puzzleCell';
import { Puzzle } from './models/puzzle';

@Injectable()
export class WordSelectionStateService {
  public lastElementMovedOver: PuzzleCell = null;
  public isSelectingWord: boolean;
  public wordBeingSelected: ICellWithCoordinates[] = <ICellWithCoordinates[]>[];
  private directionBeingSelected: Direction;

  public wordsSelected = new EventEmitter<PuzzleCell[]>();
  public selectionChanges = new EventEmitter<PuzzleCell[]>();

  public currentPuzzle: Puzzle;

  doneWithWord() {
    this.wordBeingSelected.forEach(c => c.cell.isHighlighted = false);

    const selectedWord = this.wordBeingSelected.map(w => w.cell);
    this.wordBeingSelected = [];
    this.directionBeingSelected = null;
    this.isSelectingWord = false;
    this.lastElementMovedOver = null;

    this.wordsSelected.emit(selectedWord);
    this.selectionChanges.emit([]);
  }

  private getDirection(letter: ICellWithCoordinates)
  {
      const priorCell = this.wordBeingSelected[0];

      const verticalDifference = letter.row - priorCell.row;
      const horizontalDifference = letter.col - priorCell.col;

      const wordLength = Math.max(Math.abs(verticalDifference), Math.abs(horizontalDifference)) + 1;

      let result: Direction = 0;

      // if (verticalDifference > horizontalDifference)
      //   result = Direction.down;

      if (letter.row === priorCell.row)
      {
        if (letter.col > priorCell.col) {
          result = Direction.right;
        }
        if (letter.col < priorCell.col) {
          result = Direction.left;
        }
      }

      if (letter.row > priorCell.row) {
        if (letter.col === priorCell.col) {
          result = Direction.down;
        }
        if (letter.col > priorCell.col)
        {
          result = Direction.downRight;
        }
        if (letter.col < priorCell.col)
        {
          result = Direction.downLeft;
        }
      }

      if (letter.row < priorCell.row)
      {
        if (letter.col < priorCell.col) {
          result = Direction.upLeft;
        }
        if (letter.col === priorCell.col) {
          result = Direction.up;
        }
        if (letter.col > priorCell.col) {
          result = Direction.upRight;
        }
      }

      return { result, wordLength, startingLetter: priorCell };
  }

  addLetter(letter: ICellWithCoordinates) {
    if (this.wordBeingSelected.length > 0)
    {
      const directionAndLength = this.getDirection(letter);

      // Choose which letter should ACTUALLY be considered the "end letter" of the word
      let newCol = directionAndLength.startingLetter.col;
      let newRow = directionAndLength.startingLetter.row;

      let puzzleSize = this.currentPuzzle.getPuzzleSize();

      if (directionAndLength.wordLength > 1)
      {
        if (directionAndLength.result === Direction.left || directionAndLength.result === Direction.upLeft || directionAndLength.result === Direction.downLeft) {
          newCol = Math.max(newCol - (directionAndLength.wordLength - 1), 1);
        }

        if (directionAndLength.result === Direction.right || directionAndLength.result === Direction.upRight || directionAndLength.result === Direction.downRight) {
          newCol = Math.min(newCol + (directionAndLength.wordLength - 1), puzzleSize);
        }

        if (directionAndLength.result === Direction.down || directionAndLength.result === Direction.downLeft || directionAndLength.result === Direction.downRight) {
          newRow = Math.min(newRow + (directionAndLength.wordLength - 1), puzzleSize);
        }

        if (directionAndLength.result === Direction.up || directionAndLength.result === Direction.upLeft || directionAndLength.result === Direction.upRight) {
          newRow = Math.max(newRow - (directionAndLength.wordLength - 1), 1);
        }
      }

      let endLetter = this.currentPuzzle.getLetterAtCoordinate({ row: newRow, column: newCol });
      if (endLetter)
      {
        this.wordBeingSelected.splice(1);     // Clear all but first

        if (directionAndLength.wordLength > 1) {
          const additionalLettersInWord = this.getLettersBetween(this.wordBeingSelected[0], endLetter);
          additionalLettersInWord.forEach(l => this.wordBeingSelected.push(l));

          this.wordBeingSelected.push(endLetter);  // Add most recent
        }
      }
    }
    else {

      this.wordBeingSelected.push(letter);  // Add most recent
    }

    this.selectionChanges.emit(this.wordBeingSelected.map(w => w.cell));
  }

  private getLettersBetween(startLetter: ICellWithCoordinates, endLetter: ICellWithCoordinates) {
    const result = <ICellWithCoordinates[]>[];

    let next = this.getNextLetter(startLetter, endLetter);
    while (next.row !== endLetter.row || next.col !== endLetter.col) {
      result.push(next);
      next = this.getNextLetter(next, endLetter);
    }

    return result;
  }

  private getNextLetter(startLetter: ICellWithCoordinates, endLetter: ICellWithCoordinates) {
    let rowInc = 0;
    let colInc = 0;

    if (startLetter.row > endLetter.row)
      rowInc = -1;
    else if (startLetter.row < endLetter.row)
      rowInc = 1;

    if (startLetter.col > endLetter.col)
      colInc = -1;
    else if (startLetter.col < endLetter.col)
      colInc = 1;

    let result = this.currentPuzzle.getLetterAtCoordinate({row: startLetter.row + rowInc, column: startLetter.col + colInc});
    return result;
  }

  wordBeingSelectedAsString() {
    return this.wordBeingSelected.map(w => w.cell.letter).join('');
  }
}

enum Direction {
  up,
  down,
  left,
  right,
  upRight,
  upLeft,
  downRight,
  downLeft
}
