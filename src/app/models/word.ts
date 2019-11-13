import { Input } from "@angular/core";

export class Word {
  public word = "";
  public isFound = false;
  public isSelected = false;
  public foundOrder: number;

  constructor(word: string) {
    this.word = word;
  }
}