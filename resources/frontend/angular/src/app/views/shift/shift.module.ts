import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { ShiftEditComponent } from './components/shift-edit/shift-edit.component';
import { ColourPickerModule } from 'src/app/shared/colour-picker/colour-picker.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { SpinnerOverlayModule } from 'src/app/shared/spinner-overlay/spinner-overlay.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';

@NgModule({
  declarations: [ShiftListComponent, ShiftEditComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColourPickerModule,
    SpinnerOverlayModule,
    DialogsModule,
    PaginationModule,
  ],
})
export class ShiftModule {}
