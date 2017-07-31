import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IWordSelectionChange } from './../ww.interfaces';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { Word } from 'app/models/word';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  @Input() public words: Word[] = [];
  @Output() public wordSelected = new EventEmitter<IWordSelectionChange>();
  @Output() public wordIndicated = new EventEmitter<IWordSelectionChange>();
  sortedWords: Word[] = [];

  constructor() { }

  private wordsFound = 0;
  ngDoCheck() {
    if (this.words.filter(w => w.isFound).length !== this.wordsFound)
    {
      // There must be a better way to do change detection than this!
      this.wordsFound = this.words.filter(w => w.isFound).length;
      this.sortWords();
    }
  }

  ngOnInit() {
    this.sortedWords = this.words;
  }

  onWordSelected(selectionChange: IWordSelectionChange) {
    this.wordSelected.emit(selectionChange);
    // this.wordSelected.emit({ event: event, ui: word });
  }

  onWordIndicated(selectionChange: IWordSelectionChange) {
    this.wordIndicated.emit(selectionChange);
    // this.wordSelected.emit({ event: event, ui: word });
  }

  private sortWords() {
    this.words.sort((w1, w2) => {
      if (w1.isFound && ! w2.isFound)
        return 1;
      if (w2.isFound && !w1.isFound)
        return -1;

      if (w1.isFound && w2.isFound)
      {
        if (w1.foundOrder < w2.foundOrder)
          return -1;
        else
          return 1;
      }

      if (w1.word < w2.word)
        return -1;
      else
        return 1;
    });
  }
}
