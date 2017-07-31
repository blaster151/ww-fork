import { Component, OnInit } from '@angular/core';
import { TimerService, ITimer } from './../timer.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  private isHidden: boolean = false;
  public timeElapsed: ITimer;
  private timeElapsedFormatted: string;

  constructor(private timerService: TimerService) {
    this.timerService = timerService;
  }

  ngOnInit() {
    this.timerService.intervals.forEach((t: ITimer) => {
      this.timeElapsed = t;
      this.timeElapsedFormatted = `${this.timeElapsed.hours}:${this.pad(this.timeElapsed.minutes)}:${this.pad(this.timeElapsed.seconds)}`;
    });
  }

  toggleShown() {
    this.isHidden = !this.isHidden;
  }

  pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
  }
}
