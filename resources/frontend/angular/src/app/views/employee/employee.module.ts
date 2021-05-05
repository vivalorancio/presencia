import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeecalendarListComponent } from './components/employeecalendar-list/employeecalendar-list.component';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';

@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeecalendarListComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    ColourDropdownModule,
  ],
})
export class EmployeeModule {}
