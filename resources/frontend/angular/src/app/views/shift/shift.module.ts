import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftEditComponent } from './components/shift-edit/shift-edit.component';
import { ColorPickerModule } from 'src/app/shared/color-picker/color-picker.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShiftListComponent, ShiftEditComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    ReactiveFormsModule,
    ColorPickerModule,
  ],
})
export class ShiftModule {}
