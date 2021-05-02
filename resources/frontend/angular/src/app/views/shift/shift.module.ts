import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftEditComponent } from './components/shift-edit/shift-edit.component';
import { ColourPickerModule } from 'src/app/shared/colour-picker/colour-picker.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShiftListComponent, ShiftEditComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    ReactiveFormsModule,
    ColourPickerModule,
  ],
})
export class ShiftModule {}
