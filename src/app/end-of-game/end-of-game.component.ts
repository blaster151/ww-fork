import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Puzzle } from '../models/puzzle';

@Component({
  selector: 'app-end-of-game',
  templateUrl: './end-of-game.component.html',
  styleUrls: ['./end-of-game.component.css']
})
export class EndOfGameComponent implements OnInit {

  private step: number = 1;
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
      this.puzzle.rows.forEach(r => r.cells.forEach(c => {
        if (!c.isCircled) {
          interval += 250;
          setTimeout(() => {
            c.isHighlighted = true;
          }, interval);
        }
      }));

    }
  }

  restart() {
    console.log('restart requested');
    this.resetRequested.emit(true);
  }
}
