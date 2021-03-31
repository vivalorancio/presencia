import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './management/management.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: '',
        component: ManagementComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
