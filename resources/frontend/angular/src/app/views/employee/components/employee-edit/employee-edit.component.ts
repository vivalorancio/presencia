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
  Employee,
  EmployeeCollection,
} from 'src/app/shared/models/employee.model';
import { User } from 'src/app/shared/models/user.model';

import * as employeesActions from '../../actions';
import * as shiftsActions from '../../../shift/actions';
import { ShiftCollection } from 'src/app/shared/models/shift.model';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employees!: EmployeeCollection;
  shifts!: ShiftCollection;
  employee: Employee = {} as Employee;
  pending: boolean = false;
  pending_shifts: boolean = false;
  hidepassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending = employees.pending;
    });
    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending_shifts = shifts.pending;
    });
    if (this.shifts.meta === null)
      this.store.dispatch(shiftsActions.loadShifts({ page: '1' }));

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_employee: any = (this.employees?.data.find(
        (employee: any) => employee.id === id
      ) || {}) as Employee;
      if (the_employee !== {}) {
        this.employee = the_employee;
      }
    });

    this.employeeForm = this.formBuilder.group({
      first_name: [
        this.employee.first_name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(
            /^[A-Za-z\u00C0-\u017F0-9-']+(?: +[A-Za-z\u00C0-\u017F0-9-']+)*$/
          ),
        ],
      ],
      last_name: [
        this.employee.last_name,
        [
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(
            /^[A-Za-z\u00C0-\u017F0-9-']+(?: +[A-Za-z\u00C0-\u017F0-9-']+)*$/
          ),
        ],
      ],
      code: [
        this.employee.code,
        [
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(
            /^[A-Za-z\u00C0-\u017F0-9-']+(?: +[A-Za-z\u00C0-\u017F0-9-']+)*$/
          ),
        ],
      ],
      national_id: [
        this.employee.national_id,
        [
          Validators.minLength(3),
          Validators.maxLength(32),
          Validators.pattern(
            /^[A-Za-z\u00C0-\u017F0-9-']+(?: +[A-Za-z\u00C0-\u017F0-9-']+)*$/
          ),
        ],
      ],
      email: [this.employee.email, [Validators.email]],
      start_date: [this.employee.start_date /* DD/MM/YY */],
      end_date: [
        this.employee.end_date /* DD/MM/YY !!!!!!AFTER START DATE!!!!! */,
      ],
      shift_id: [this.employee.default_shift?.id],
      supervision_group_id: [this.employee.supervision_group_id],
      username: [this.employee.user?.username /*[Validators.***]*/],
      password: ['' /*[Validators.***]*/],
      is_admin: [this.employee.user?.is_admin],
      is_blocked: [this.employee.user?.is_blocked],
    });
  }

  onSubmit() {
    /* A les accions es passa empleat+usuari */
    if (this.employee.id == null) {
      this.store.dispatch(
        employeesActions.addEmployee({ employee: this.employeeForm.value })
      );
    } else {
      let employeeToSave = { id: this.employee.id, ...this.employeeForm.value };
      this.store.dispatch(
        employeesActions.updateEmployee({ employee: employeeToSave })
      );
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
