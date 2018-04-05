import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TimerService {
  public intervals: Subject<ITimer> = new Subject<ITimer>();
  private currentTime: ITimer = <ITimer>{ hours: 0, minutes: 0, seconds: 0};
  private inherentTicks = Observable.interval(1000);

  public isPaused: boolean = false;

  constructor() {
    this.inherentTicks.forEach(tick => {
      if (this.isPaused)
        return;

      // Increment tick
      if (this.currentTime)
      {
        this.currentTime.seconds++;

        if (this.currentTime.seconds === 60)
        {
          this.currentTime.minutes++;
          this.currentTime.seconds = 0;
        }

        if (this.currentTime.minutes === 60)
        {
          this.currentTime.hours++;
          this.currentTime.minutes = 0;
        }

        this.intervals.next(this.currentTime);
      }

      return <ITimer>this.currentTime;
    });
  }

  getElapsedTime() {
    return <ITimer>this.currentTime;
  }

  setElapsedTime(time: ITimer) {
    this.currentTime = time;
  }

  resetElapsedTime() {
    this.currentTime = { hours: 0, minutes: 0, seconds: 0};

    this.isPaused = false;
    this.intervals.next(this.currentTime);
  }
}

export interface ITimer {
  seconds: number;
  minutes: number;
  hours: number;
}
