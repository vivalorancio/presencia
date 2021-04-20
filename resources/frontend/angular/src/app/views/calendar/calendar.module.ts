import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarEditComponent } from './components/calendar-edit/calendar-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarshiftsEditComponent } from './components/calendarshifts-edit/calendarshifts-edit.component';
import { ShiftDropdownModule } from 'src/app/shared/shift-dropdown/shift-dropdown.module';
import { CalendarYearModule } from 'src/app/shared/calendar/calendar-year.module';

@NgModule({
  declarations: [
    CalendarListComponent,
    CalendarEditComponent,
    CalendarshiftsEditComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    ShiftDropdownModule,
    CalendarYearModule,
  ],
})
export class CalendarModule {}
