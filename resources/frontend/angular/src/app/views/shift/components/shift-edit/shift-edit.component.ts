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
  ColourCollectionItem,
  getFromName,
} from 'src/app/shared/colour-picker/colours';
import { Shift, ShiftCollection } from 'src/app/shared/models/shift.model';

import * as shiftsActions from '../../../shift/actions';

const timeValidator: any = (fg: FormGroup) => {
  let invalid = false;
  const start = fg.get('start_time')?.value;
  const end = fg.get('end_time')?.value;
  const expected = fg.get('expected_time')?.value;
  const recess = fg.get('recess_time')?.value;

  if (!start || !end) {
    if (!start) {
      fg.get('start_time')?.setErrors({ timenotvalid: true });
    }
    if (!end) {
      fg.get('end_time')?.setErrors({ timenotvalid: true });
    }
  } else if (start === end) {
    fg.get('start_time')?.setErrors({ timenotvalid: true });
    fg.get('end_time')?.setErrors({ timenotvalid: true });
  } else {
    fg.get('start_time')?.updateValueAndValidity({ onlySelf: true });
    fg.get('end_time')?.updateValueAndValidity({ onlySelf: true });
  }

  if (!expected || expected === '00:00') {
    fg.get('expected_time')?.setErrors({ timenotvalid: true });
  } else {
    fg.get('expected_time')?.updateValueAndValidity({ onlySelf: true });
  }

  if (recess === '00:00') {
    fg.get('recess_time')?.setErrors({ timenotvalid: true });
  } else {
    fg.get('recess_time')?.updateValueAndValidity({ onlySelf: true });
  }

  return null;
};

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
  submiterror: any;

  colourItem: ColourCollectionItem = { name: 'bg-gray-50', colour: '#F9FAFB' };

  submitted: boolean = false;
  showDeleteConfirmation = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending = shifts.pending;
      this.submiterror = shifts.error;
    });
    this.colourItem = { name: 'bg-gray-50', colour: '#F9FAFB' };
    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_shift: any = (this.shifts?.data.find(
        (shift: any) => shift.id === id
      ) || {}) as Shift;
      if (the_shift !== {}) {
        this.shift = the_shift;
        this.colourItem.name = this.shift.colour
          ? this.shift.colour
          : this.colourItem.name;
        this.colourItem.colour = getFromName(this.colourItem.name).colour;
      }
    });
    this.submitted = false;

    this.shiftForm = this.formBuilder.group(
      {
        code: [
          this.shift.code,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(3),
          ],
        ],
        description: [
          this.shift.description,
          [Validators.required, Validators.maxLength(50)],
        ],
        start_time: [this.shift.start_time || '00:00'],
        end_time: [this.shift.end_time || '00:00'],
        expected_time: [this.shift.expected_time || '00:00'],
        recess_time: [this.shift.recess_time],
        is_holiday: [
          this.shift.is_holiday !== undefined ? this.shift.is_holiday : false,
        ],
      },
      { validator: timeValidator }
    );
  }

  askDelete() {
    this.showDeleteConfirmation = true;
    return;
  }

  actionDelete(proceed: boolean) {
    this.showDeleteConfirmation = false;
    if (proceed)
      this.store.dispatch(shiftsActions.deleteShift({ id: this.shift.id }));
  }

  onSubmit() {
    this.submitted = true;
    let shiftToSave = {
      ...this.shiftForm.value,
      colour: this.colourItem.name,
    };
    shiftToSave.code = shiftToSave.code.toUpperCase();
    console.log(this.colourItem);
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
    } else if (fc.hasError('timenotvalid')) {
      return 'Invalid time';
    } else if (fc.hasError('submiterror')) {
      return fc.getError('submiterror');
    }
  }

  getSubmitErrorDescription(): string {
    let error: string = '';
    if (this.submitted && this.submiterror?.error) {
      Object.entries(this.submiterror.error.errors).forEach((item: any) => {
        item[1].forEach((err: string) => (error += err + ' '));
      });
    }
    return error;
  }

  acceptError() {
    this.submitted = false;
  }
}
