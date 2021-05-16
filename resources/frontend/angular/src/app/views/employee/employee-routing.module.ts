import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeecalendarListComponent } from './components/employeecalendar-list/employeecalendar-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';

const routes: Routes = [
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
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
