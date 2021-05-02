import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarEditComponent } from './components/calendar-edit/calendar-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarshiftsEditComponent } from './components/calendarshifts-edit/calendarshifts-edit.component';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';
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
    ColourDropdownModule,
    CalendarYearModule,
  ],
})
export class CalendarModule {}
