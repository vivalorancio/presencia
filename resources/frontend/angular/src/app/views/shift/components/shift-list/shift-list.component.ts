import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
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
  display!: DisplayResourceCollection;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.display = {
      page: '1',
      per_page: '25',
      sort_field: 'code',
      sort_direction: 'asc',
    };

    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending = shifts.pending;
      this.display = shifts.display;
    });

    if (this.shifts.meta === null)
      this.store.dispatch(shiftsActions.loadShifts({ display: this.display }));
  }

  getTextColourFromName = getTextColourFromName;

  open(id: number) {
    console.log(id);
    this.router.navigate([`/management/shifts/shift/${id}`]);
  }

  dispatchLoad(): void {
    this.store.dispatch(
      shiftsActions.loadShifts({
        display: this.display,
      })
    );
  }

  loadpage(page: string) {
    this.display = { ...this.display, page: page };
    this.dispatchLoad();
  }

  orderBy(sort_field: string) {
    let asc = false;
    if (this.display.sort_field === sort_field) {
      this.toggleDirection();
    } else {
      asc = true;
    }

    this.display = {
      ...this.display,
      sort_field: sort_field,
      sort_direction: asc ? 'asc' : this.display.sort_direction,
      page: '1',
    };

    this.dispatchLoad();
  }

  toggleDirection() {
    if (this.display.sort_direction === 'asc') {
      this.display = { ...this.display, sort_direction: 'desc' };
    } else {
      this.display = { ...this.display, sort_direction: 'asc' };
    }
  }

  onPerpageSelected(event: any) {
    const per_page = event.target.value;
    this.display = { ...this.display, per_page: per_page, page: '1' };
    this.dispatchLoad();
  }
}
