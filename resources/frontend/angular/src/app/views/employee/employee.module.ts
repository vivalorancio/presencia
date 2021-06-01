import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeecalendarListComponent } from './components/employeecalendar-list/employeecalendar-list.component';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';
import { SpinnerOverlayModule } from 'src/app/shared/spinner-overlay/spinner-overlay.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BookingrequestEditComponent } from './components/bookingrequest-edit/bookingrequest-edit.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { AbsencerequestEditComponent } from './components/absencerequest-edit/absencerequest-edit.component';
import { AbsenceEditComponent } from './components/absence-edit/absence-edit.component';
import { EmployeeholidayperiodListComponent } from './components/employeeholidayperiod-list/employeeholidayperiod-list.component';
import { EmployeeholidaysEditComponent } from './components/employeeholidays-edit/employeeholidays-edit.component';
import { HolidaysrequestEditComponent } from './components/holidaysrequest-edit/holidaysrequest-edit.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeecalendarListComponent,
    BookingsListComponent,
    BookingEditComponent,
    BookingrequestEditComponent,
    RequestsListComponent,
    AbsencerequestEditComponent,
    AbsenceEditComponent,
    EmployeeholidayperiodListComponent,
    EmployeeholidaysEditComponent,
    HolidaysrequestEditComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColourDropdownModule,
    SpinnerOverlayModule,
    DialogsModule,
    PaginationModule,
  ],
})
export class EmployeeModule {}
