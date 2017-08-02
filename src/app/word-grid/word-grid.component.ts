import { Component, OnInit, Input, Output, EventEmitter, ElementRef, KeyValueDiffers } from '@angular/core';
import { WordSelectionStateService } from './../word-selection-state.service';
import { Observable } from 'rxjs';
import { Puzzle } from '../models/puzzle';
import { Http } from '@angular/http';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent {
  @Input() puzzle: Puzzle;
  @Output() public lettersClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private element: ElementRef, private http: Http ) {
    this.element = element;
  }

  letterClicked(letter: string) {
    console.log('emitting letter ');
    this.lettersClicked.emit(letter);

  }

  onMouseMoveOverGrid($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    return false;
  }
}
