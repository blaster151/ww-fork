import { Component, OnInit, Input, Output, EventEmitter, ElementRef, KeyValueDiffers } from '@angular/core';
import { WordSelectionStateService } from './../word-selection-state.service';
import { Observable } from 'rxjs';
import { Puzzle } from '../models/puzzle';
import { Http } from '@angular/http';
import { DynamicFontSizeDirective } from '../dynamic-font-size.directive';

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
    this.lettersClicked.emit(letter);
  }

  // I have no recollection why this is needed
  onMouseMoveOverGrid($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    return false;
  }
}
