import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { CalendarEditComponent } from './components/calendar-edit/calendar-edit.component';
import { CalendarListComponent } from './components/calendar-list/calendar-list.component';
import { CalendarshiftsEditComponent } from './components/calendarshifts-edit/calendarshifts-edit.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'calendars',
        component: CalendarListComponent,
      },
      {
        path: 'calendars/calendar',
        component: CalendarEditComponent,
      },
      {
        path: 'calendars/calendar/:id/shifts',
        component: CalendarshiftsEditComponent,
      },
      {
        path: 'calendars/calendar/:id',
        component: CalendarEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
