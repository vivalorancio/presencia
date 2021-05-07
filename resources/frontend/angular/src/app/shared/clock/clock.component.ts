import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clock',
  // templateUrl: './clock.component.html',
  template: '{{ hours }}:{{ minutes }}:{{ seconds }}',
  //styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  hours = '' as string;
  minutes = '' as string;
  seconds = '' as string;
  datetime!: Date;
  private timerId: any;

  @Output() datetimeChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit() {
    this.setCurrentTime();
    this.timerId = this.updateTime();
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }

  private setCurrentTime() {
    this.datetime = new Date(Date.now());
    this.hours = `00${this.datetime.getHours()}`.slice(-2);
    this.minutes = `00${this.datetime.getMinutes()}`.slice(-2);
    this.seconds = `00${this.datetime.getSeconds()}`.slice(-2);

    this.datetimeChange.emit(this.datetime);
  }

  private updateTime(): any {
    return setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }
}
