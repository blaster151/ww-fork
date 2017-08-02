import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWordSelectionChange } from './../ww.interfaces';
import { keyframes, trigger, state, transition, animate, style } from '@angular/animations';
import { Word } from '../models/word';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css'],
  // animations: [
  //   trigger('wordcompleted', [
  //     state('Yes', style({ background: 'green', width: '50%'})),
  //     state('No', style({ width: '20%'}))
  //     // ,
  //     // transition('No <=> Yes', animate('1000ms'))
  //   ])
  // ]
})
export class WordComponent implements OnInit {
  @Input() public word: Word;
  @Output() public wordSelected = new EventEmitter<IWordSelectionChange>();
  @Output() public wordIndicated = new EventEmitter<IWordSelectionChange>();

  public iscomplete: string = 'No';

  constructor() { }

  ngOnInit() {
  }

  toggleSelected(evt: MouseEvent, newValue: boolean) {
    if (evt.button !== 2)
    {
      this.word.isSelected = newValue;

      this.wordSelected.emit({ word: this.word, selected: this.word.isSelected });
    }
  }

  indicate(evt) {
    this.wordIndicated.emit({ word: this.word, selected: this.word.isSelected });
    this.iscomplete = 'Yes';

    return false;
  }
}
