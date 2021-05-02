import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidenceRoutingModule } from './incidence-routing.module';
import { IncidenceListComponent } from './components/incidence-list/incidence-list.component';
import { IncidenceEditComponent } from './components/incidence-edit/incidence-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColourPickerModule } from 'src/app/shared/colour-picker/colour-picker.module';
import { IncidencesgroupListComponent } from './components/incidencesgroup-list/incidencesgroup-list.component';
import { IncidencesgroupEditComponent } from './components/incidencesgroup-edit/incidencesgroup-edit.component';
import { IncidencesgroupincidenceListComponent } from './components/incidencesgroupincidence-list/incidencesgroupincidence-list.component';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';

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
    ReactiveFormsModule,
    ColourDropdownModule,
    ColourPickerModule,
  ],
})
export class IncidenceModule {}
