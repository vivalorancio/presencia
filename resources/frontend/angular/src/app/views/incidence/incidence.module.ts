import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidenceRoutingModule } from './incidence-routing.module';
import { IncidenceListComponent } from './components/incidence-list/incidence-list.component';
import { IncidenceEditComponent } from './components/incidence-edit/incidence-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColourPickerModule } from 'src/app/shared/colour-picker/colour-picker.module';
import { IncidencesgroupListComponent } from './components/incidencesgroup-list/incidencesgroup-list.component';
import { IncidencesgroupEditComponent } from './components/incidencesgroup-edit/incidencesgroup-edit.component';
import { IncidencesgroupincidenceListComponent } from './components/incidencesgroupincidence-list/incidencesgroupincidence-list.component';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';
import { SpinnerOverlayModule } from 'src/app/shared/spinner-overlay/spinner-overlay.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';

@NgModule({
  declarations: [
    IncidenceListComponent,
    IncidenceEditComponent,
    IncidencesgroupListComponent,
    IncidencesgroupEditComponent,
    IncidencesgroupincidenceListComponent,
  ],
  imports: [
    CommonModule,
    IncidenceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColourDropdownModule,
    ColourPickerModule,
    SpinnerOverlayModule,
    DialogsModule,
    PaginationModule,
  ],
})
export class IncidenceModule {}
