import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { Shift, ShiftCollection } from 'src/app/shared/models/shift.model';

import * as shiftsActions from '../../actions';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css'],
})
export class ShiftListComponent implements OnInit {
  shifts!: ShiftCollection;
  pending: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending = shifts.pending;
    });

    if (this.shifts.meta === null)
      this.store.dispatch(shiftsActions.loadShifts({ page: '1' }));
  }

  getTextColourFromName = getTextColourFromName;

  deleteShift(id: number) {
    this.store.dispatch(shiftsActions.deleteShift({ id }));
  }

  firstpage() {
    this.store.dispatch(shiftsActions.loadShifts({ page: '1' }));
  }
  previouspage() {
    this.store.dispatch(
      shiftsActions.loadShifts({
        page: `${this.shifts.meta?.current_page - 1}`,
      })
    );
  }
  nextpage() {
    this.store.dispatch(
      shiftsActions.loadShifts({
        page: `${this.shifts.meta?.current_page + 1}`,
      })
    );
  }
  lastpage() {
    this.store.dispatch(
      shiftsActions.loadShifts({ page: this.shifts.meta?.last_page })
    );
  }
}
