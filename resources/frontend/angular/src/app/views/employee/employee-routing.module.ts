import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'employees',
        component: EmployeeManagementComponent,
      },
      {
        path: 'employees/employee',
        component: EmployeeEditComponent,
      },
      {
        path: 'employees/employee/:id',
        component: EmployeeEditComponent,
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
