import { Component, OnInit, Input, Output, EventEmitter, ElementRef, KeyValueDiffers, ViewChild, ContentChild } from '@angular/core';
import { WordSelectionStateService } from './../word-selection-state.service';
import { Observable } from 'rxjs';
import { Puzzle } from '../models/puzzle';
import { Http } from '@angular/http';
import { DynamicFontSizeDirective } from '../dynamic-font-size.directive';
import { BiggestPossibleSquareDirective } from 'app/biggest-possible-square.directive';

@Component({
  selector: 'app-word-grid',
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.css']
})
export class WordGridComponent {
  @Input() puzzle: Puzzle;
  @Output() public lettersClicked: EventEmitter<string> = new EventEmitter<string>();
  @ContentChild(BiggestPossibleSquareDirective) private biggestPossibleSquareDirective: BiggestPossibleSquareDirective;
  constructor(private element: ElementRef, private http: Http ) {
    this.element = element;
  }

  ngAfterViewInit() {
    // Deterministically call resizeSquare
//    console.log('wordGrid resizing its child square');
    this.biggestPossibleSquareDirective.resizeSquare();
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
