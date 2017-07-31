export class PuzzleCell {
  public isHighlighted: boolean;
  public isCircled: boolean;
  public letter: string;

  constructor(letter: string)
  {
    this.letter = letter;
  }
}