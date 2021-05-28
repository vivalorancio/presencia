import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeecalendarListComponent } from './components/employeecalendar-list/employeecalendar-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BookingrequestEditComponent } from './components/bookingrequest-edit/bookingrequest-edit.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { AbsencerequestEditComponent } from './components/absencerequest-edit/absencerequest-edit.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: 'bookings',
        component: BookingsListComponent,
      },
      {
        path: 'requests/booking',
        component: BookingrequestEditComponent,
      },
      {
        path: 'requests/booking/:request_id',
        component: BookingrequestEditComponent,
      },
      {
        path: 'requests/absence',
        component: AbsencerequestEditComponent,
      },
      {
        path: 'requests/absence/:request_id',
        component: AbsencerequestEditComponent,
      },
      {
        path: 'requests',
        component: RequestsListComponent,
      },
      {
        path: 'supervisedrequests',
        component: RequestsListComponent,
      },
      {
        path: 'supervisedrequests/booking/:request_id',
        component: BookingrequestEditComponent,
      },
      {
        path: 'supervisedrequests/absence/:request_id',
        component: AbsencerequestEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'employees',
        component: EmployeeListComponent,
      },
      {
        path: 'employees/employee',
        component: EmployeeEditComponent,
      },
      {
        path: 'employees/employee/:id',
        component: EmployeeEditComponent,
      },
      {
        path: 'employees/employee/:employee_id/calendars',
        component: EmployeecalendarListComponent,
      },
      {
        path: 'employees/employee/:employee_id/bookings',
        component: BookingsListComponent,
      },
      {
        path: 'employees/employee/:employee_id/bookings/booking',
        component: BookingEditComponent,
      },
      {
        path: 'employees/employee/:employee_id/bookings/booking/:booking_id',
        component: BookingEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
