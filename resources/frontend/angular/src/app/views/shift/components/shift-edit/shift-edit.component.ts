import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import {
  ColorCollectionItem,
  getFromName,
} from 'src/app/shared/color-picker/colors';
import { Shift, ShiftCollection } from 'src/app/shared/models/shift.model';

import * as shiftsActions from '../../../shift/actions';

@Component({
  selector: 'app-shift-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.css'],
})
export class ShiftEditComponent implements OnInit {
  shiftForm!: FormGroup;
  shifts!: ShiftCollection;
  shift: Shift = {} as Shift;
  pending: boolean = false;

  colorItem: ColorCollectionItem = { name: 'bg-gray-50', color: '#F9FAFB' };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending = shifts.pending;
    });
    this.colorItem = { name: 'bg-gray-50', color: '#F9FAFB' };
    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_shift: any = (this.shifts?.data.find(
        (shift: any) => shift.id === id
      ) || {}) as Shift;
      if (the_shift !== {}) {
        this.shift = the_shift;
        this.colorItem.name = this.shift.colour
          ? this.shift.colour
          : this.colorItem.name;
        this.colorItem.color = getFromName(this.colorItem.name).color;
      }
    });

    this.shiftForm = this.formBuilder.group({
      code: [
        this.shift.code,
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      description: [
        this.shift.description,
        [Validators.required, Validators.maxLength(50)],
      ],
      //colour: [this.shift.colour],
      start_time: [this.shift.start_time],
      end_time: [this.shift.end_time],
      expected_time: [this.shift.expected_time],
      recess_time: [this.shift.recess_time],
      is_holiday: [this.shift.is_holiday ? this.shift.is_holiday : false],
    });
  }

  onSubmit() {
    let shiftToSave = {
      ...this.shiftForm.value,
      colour: this.colorItem.name,
    };
    console.log(this.colorItem);
    console.log(shiftToSave);
    if (this.shift.id == null) {
      this.store.dispatch(shiftsActions.addShift({ shift: shiftToSave }));
    } else {
      shiftToSave = {
        id: this.shift.id,
        ...shiftToSave,
      };
      this.store.dispatch(shiftsActions.updateShift({ shift: shiftToSave }));
    }
  }

  getControlErrorMessage(fca: AbstractControl | null, label: string) {
    let fc = fca as AbstractControl;
    if (fc.hasError('required')) {
      return label + ' is required';
    } else if (fc.hasError('minlength')) {
      return label + ' too short';
    } else if (fc.hasError('maxlength')) {
      return label + ' too long';
    } else if (fc.hasError('pattern')) {
      return 'Invalid characters';
    } else if (fc.hasError('min')) {
      return label + ' has to be at least 1';
    } else if (fc.hasError('submiterror')) {
      return fc.getError('submiterror');
    }
  }
}
