import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';
import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaEditComponent } from './components/area-edit/area-edit.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { SectionEditComponent } from './components/section-edit/section-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerOverlayModule } from 'src/app/shared/spinner-overlay/spinner-overlay.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';
import { SupervisiongroupListComponent } from './components/supervisiongroup-list/supervisiongroup-list.component';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentEditComponent,
    AreaListComponent,
    AreaEditComponent,
    SectionListComponent,
    SectionEditComponent,
    SupervisiongroupListComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerOverlayModule,
    DialogsModule,
    PaginationModule,
  ],
})
export class OrganizationModule {}
