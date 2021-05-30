import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidayperiodListComponent } from './components/holidayperiod-list/holidayperiod-list.component';
import { SpinnerOverlayModule } from 'src/app/shared/spinner-overlay/spinner-overlay.module';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { PaginationModule } from 'src/app/shared/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayperiodEditComponent } from './components/holidayperiod-edit/holidayperiod-edit.component';

@NgModule({
  declarations: [HolidayperiodListComponent, HolidayperiodEditComponent],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerOverlayModule,
    DialogsModule,
    PaginationModule,
  ],
})
export class HolidaysModule {}
