import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shift } from '../../models/shift.model';
import { getTextColorFromName } from 'src/app/shared/color-picker/colors';

@Component({
  selector: 'app-shift-dropdown',
  templateUrl: './shift-dropdown.component.html',
  styleUrls: ['./shift-dropdown.component.css'],
})
export class ShiftDropdownComponent implements OnInit {
  selectedShift: Shift = {} as Shift;
  shiftlisthidden: boolean = true;

  @Input() shifts: Shift[] = [];

  @Output() selectedShiftEvent = new EventEmitter<Shift>();

  //
  //
  //
  //    FALTARÀ LA DIRECTIVA HIGHLIGHT!!!!
  //
  //
  //
  //
  //

  constructor() {}

  ngOnInit(): void {}

  getTextColorFromName = getTextColorFromName;

  toggleshiftlist() {
    this.shiftlisthidden = !this.shiftlisthidden;
  }

  isSelectedShift(shift: Shift | -1): boolean {
    if (this.selectedShift?.id === undefined && shift === -1) return true;
    return shift != -1 && this.selectedShift?.id === shift.id;
  }

  selectShift(shift: Shift | -1) {
    if (shift === -1) this.selectedShift = {} as Shift;
    else this.selectedShift = shift;
    this.selectedShiftEvent.emit(this.selectedShift);
    this.toggleshiftlist();
  }
}
