import { PuzzleCell } from './puzzleCell';

export class PuzzleRow {
  public cells: PuzzleCell[] = [];

  constructor(letters: string[]) {
    if (letters != null) {
      letters.forEach(l => this.cells.push(new PuzzleCell(l)));
    }
  }
}