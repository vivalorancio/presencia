import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { IncidenceEditComponent } from './components/incidence-edit/incidence-edit.component';
import { IncidenceListComponent } from './components/incidence-list/incidence-list.component';
import { IncidencesgroupEditComponent } from './components/incidencesgroup-edit/incidencesgroup-edit.component';
import { IncidencesgroupListComponent } from './components/incidencesgroup-list/incidencesgroup-list.component';
import { IncidencesgroupincidenceListComponent } from './components/incidencesgroupincidence-list/incidencesgroupincidence-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'incidences',
        component: IncidenceListComponent,
      },
      {
        path: 'incidences/incidence',
        component: IncidenceEditComponent,
      },
      {
        path: 'incidences/incidence/:id',
        component: IncidenceEditComponent,
      },
      {
        path: 'incidencesgroups',
        component: IncidencesgroupListComponent,
      },
      {
        path: 'incidencesgroups/incidencesgroup',
        component: IncidencesgroupEditComponent,
      },
      {
        path: 'incidencesgroups/incidencesgroup/:id',
        component: IncidencesgroupEditComponent,
      },
      {
        path: 'incidencesgroups/incidencesgroup/:incidencesgroup_id/incidences',
        component: IncidencesgroupincidenceListComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidenceRoutingModule {}
