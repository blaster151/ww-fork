import { Observable } from 'rxjs';
import { ITimer } from './timer.service';
import { PuzzleCell } from './models/puzzleCell';
import { Word } from 'app/models/word';

export interface IWordSelectionChange {
  word: Word;
  selected: boolean;
}

export interface ICellWithCoordinates {
  cell: PuzzleCell;
  row: number;
  col: number;
}

export interface ISelectionCoordinate
{
  row: number;
  column: number;
}

export interface ISelectionCoordinates
{
  coordinates: ISelectionCoordinate[];
}

export interface IWordWithCoordinates {
  word: string;
  coords: ICellWithCoordinates[];
}

export interface ISavedPuzzle {
  elapsedTime: ITimer;
  foundWords: string[];
}
