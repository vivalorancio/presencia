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

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeecalendarListComponent,
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
