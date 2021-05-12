import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/shared/layout/main/main.component';
import { AdminGuard } from '../authentication/guards/admin.guard';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { SectionEditComponent } from './components/section-edit/section-edit.component';
import { SectionListComponent } from './components/section-list/section-list.component';

const routes: Routes = [
  {
    path: 'management',
    component: MainComponent,
    children: [
      {
        path: 'departments',
        component: DepartmentListComponent,
      },
      {
        path: 'departments/department',
        component: DepartmentEditComponent,
      },
      {
        path: 'departments/department/:id',
        component: DepartmentEditComponent,
      },
      {
        path: 'areas',
        component: AreaListComponent,
      },
      {
        path: 'areas/area',
        component: AreaEditComponent,
      },
      {
        path: 'areas/area/:id',
        component: AreaEditComponent,
      },
      {
        path: 'sections',
        component: SectionListComponent,
      },
      {
        path: 'sections/section',
        component: SectionEditComponent,
      },
      {
        path: 'sections/section/:id',
        component: SectionEditComponent,
      },
    ],
    canActivate: [AuthenticationGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
