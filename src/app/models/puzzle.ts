import { PuzzleRow } from './puzzleRow';
import { Word } from 'app/models/word';
import { ISelectionCoordinate, ICellWithCoordinates } from '../ww.interfaces';
import { PuzzleCell } from './puzzleCell';
import { Observable } from 'rxjs';

export class Puzzle {
  public title: string;
  public solution: string;
  public rows: PuzzleRow[] = [];
  public words: Word[] = [];
  public selectedWord: string;

  isComplete() {
    return this.words.every(w => w.isFound);
  }

  getPuzzleSize() {
    return this.rows.length + 1;
  }

  getLetterAtCoordinate(coord: ISelectionCoordinate) {
    if (coord.row <= 0 || coord.column <= 0 || coord.row > this.rows.length || coord.column > this.rows.length)
      return null;

    return <ICellWithCoordinates>{ cell: this.rows[coord.row-1].cells[coord.column-1], col: coord.column, row: coord.row };
  }

  getCoordinatesForCell(cell: PuzzleCell) {
    var result: ICellWithCoordinates;

    this.rows.forEach((r, ri) => r.cells.forEach((c, ci) => {
      if (c === cell)
        result = { cell: c,  row: ri+1, col: ci+1 };
    }));

    return result;
  }

  getCoordinates(word: string) {
    var startingLetter = word[0];
    var lengthOfWord = word.length;

    let allCells = Observable.from(this.rows)
      .flatMap((r: PuzzleRow, rowIndex) => Observable.from<PuzzleCell>(r.cells).map((c: PuzzleCell, colIndex) =>
      {
        return <ICellWithCoordinates>{ cell: <PuzzleCell>c, row: rowIndex+1, col: colIndex+1 };
      }));
    var possibleStarts = <Observable<ICellWithCoordinates>>allCells.filter(c => { return c.cell.letter === startingLetter.toString() });
    var searchUp = (cell: ICellWithCoordinates) => { cell.row--; return cell; }
    var searchDown = (cell: ICellWithCoordinates) => { cell.row++; return cell; }
    var searchLeft = (cell: ICellWithCoordinates) => { cell.col--; return cell; }
    var searchRight = (cell: ICellWithCoordinates) => { cell.col++; return cell; }
    var searchUpRight = (cell: ICellWithCoordinates) => { cell.row--; cell.col++; return cell; }
    var searchUpLeft = (cell: ICellWithCoordinates) => { cell.row--; cell.col--; return cell; }
    var searchDownRight = (cell: ICellWithCoordinates) => { cell.row++; cell.col++; return cell; }
    var searchDownLeft = (cell: ICellWithCoordinates) => { cell.row++; cell.col--; return cell; }

    const searches = [searchUp, searchRight, searchUpRight, searchUpLeft, searchDown, searchDownLeft, searchDownRight, searchLeft ];
    var searchesObservable = Observable.from(searches);

    let possibleWords = Observable.from(searchesObservable).flatMap(search => {
      let possibleWords2 = possibleStarts.map(startLetter => {
        let possibleWordLength = 0;
        let newWord = <ICellWithCoordinates[]>[];
        while (possibleWordLength < lengthOfWord)
        {
          let nextLetter = this.getLetterAtCoordinate({ row: startLetter.row, column: startLetter.col });
          newWord.push(nextLetter);

          startLetter = search(startLetter);
          possibleWordLength++;
        }

        return newWord;
      });

      return possibleWords2;
    });

    let validPossibleWords = possibleWords.filter(c => {
      let result = c.every(l => l != null);
      return result;
    });

    validPossibleWords = validPossibleWords.filter(pw => {
      return pw.map(c => c.cell.letter).join("") === word;
    });

    let result: ICellWithCoordinates[];

    validPossibleWords.subscribe(vpw => result = vpw);
    return result;
  }

  highlightLetter(letter: string, value: boolean = true) {
    this.rows.forEach(r => r.cells.forEach(c => {
      if (c.letter === letter)
        c.isHighlighted = value;
    }));
  }
}
