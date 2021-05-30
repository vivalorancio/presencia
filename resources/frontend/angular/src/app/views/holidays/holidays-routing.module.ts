import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { HolidayperiodEditComponent } from './components/holidayperiod-edit/holidayperiod-edit.component';
import { HolidayperiodListComponent } from './components/holidayperiod-list/holidayperiod-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'holidays',
        component: HolidayperiodListComponent,
      },
      {
        path: 'holidays/holidayperiods',
        component: HolidayperiodEditComponent,
      },
      {
        path: 'holidays/holidayperiods/:id',
        component: HolidayperiodEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidaysRoutingModule {}
