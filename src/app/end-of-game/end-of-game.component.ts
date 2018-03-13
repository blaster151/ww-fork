import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Puzzle } from '../models/puzzle';

@Component({
  selector: 'app-end-of-game',
  templateUrl: './end-of-game.component.html',
  styleUrls: ['./end-of-game.component.css']
})
export class EndOfGameComponent implements OnInit {

  public step: number = 1;
  @Input() puzzle: Puzzle;
  @Output() resetRequested = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  nextMessage() {
    this.step++;

    if (this.step === 3)
    {
      let interval = 0;
      this.puzzle.getAllCells().forEach(c => {
        if (!c.isCircled) {
          interval += 250;
          setTimeout(() => {
            c.isHighlighted = true;
          }, interval);
        }
      });
    }
  }

  restart() {
    // Reset highlight state of all cells
    this.puzzle.getAllCells().forEach(c => {
      c.isHighlighted = false;
    });

    this.resetRequested.emit(true);
  }
}
