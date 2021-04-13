import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { ShiftEditComponent } from './components/shift-edit/shift-edit.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'shifts',
        component: ShiftListComponent,
      },
      {
        path: 'shifts/shift',
        component: ShiftEditComponent,
      },
      {
        path: 'shifts/shift/:id',
        component: ShiftEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
