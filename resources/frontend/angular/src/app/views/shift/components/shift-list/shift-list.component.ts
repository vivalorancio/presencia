import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColorFromName } from 'src/app/shared/color-picker/colors';
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

  getTextColorFromName = getTextColorFromName;

  deleteShift(id: number) {
    // const shift = this.shifts.data.find(
    //   (shift: Shift) => shift.id === id
    // );
    //console.log(shift);
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
