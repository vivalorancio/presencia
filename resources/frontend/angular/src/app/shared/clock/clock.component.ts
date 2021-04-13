import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  hours = '' as string;
  minutes = '' as string;
  seconds = '' as string;
  private timerId: any;

  constructor() {}

  ngOnInit() {
    this.setCurrentTime();
    this.timerId = this.updateTime();
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  private setCurrentTime() {
    const time = new Date(Date.now());
    this.hours = `00${time.getHours()}`.slice(-2);
    this.minutes = `00${time.getMinutes()}`.slice(-2);
    this.seconds = `00${time.getSeconds()}`.slice(-2);
  }

  private updateTime(): any {
    return setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }
}
