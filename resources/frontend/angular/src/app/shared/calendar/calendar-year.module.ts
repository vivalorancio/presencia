import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarYearComponent } from './components/calendar-year/calendar-year.component';
import { CalendarMonthComponent } from './components/calendar-month/calendar-month.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarYearComponent, CalendarMonthComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CalendarYearComponent],
})
export class CalendarYearModule {}
