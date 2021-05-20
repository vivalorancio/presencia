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

import * as employeesActions from '../../actions';
import * as shiftsActions from '../../../shift/actions';
import * as incidencesActions from '../../../incidence/actions';
import * as organizationActions from '../../../organization/actions';
import {
  ShiftCollection,
  ShiftSearch,
} from 'src/app/shared/models/shift.model';
import {
  IncidencesGroupCollection,
  IncidencesGroupSearch,
} from 'src/app/shared/models/incidence.model';
import { ColourDropdownItem } from 'src/app/shared/colour-dropdown/colour-dropdown';
import { dateAAAAMMDD } from 'src/app/shared/calendar/calendar';
import {
  AreaCollection,
  AreaSearch,
  DepartmentCollection,
  DepartmentSearch,
  SectionCollection,
  SectionSearch,
  SupervisionGroupCollection,
  SupervisionGroupSearch,
} from 'src/app/shared/models/organization.model';

const rangeValidator: any = (fg: FormGroup) => {
  let invalid = false;
  const from = fg.get('start_date')?.value;
  const to = fg.get('end_date')?.value;
  // if (!from || !to) invalid = true;
  if (from && to) {
    invalid = new Date(from).valueOf() > new Date(to).valueOf();
  }
  if (invalid) {
    fg.get('start_date')?.setErrors({ rangenotvalid: true });
    fg.get('end_date')?.setErrors({ rangenotvalid: true });
  } else {
    fg.get('start_date')?.updateValueAndValidity({ onlySelf: true });
    fg.get('end_date')?.updateValueAndValidity({ onlySelf: true });
  }
  return null;
};

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employees!: EmployeeCollection;
  pending: boolean = false;
  employee: Employee = {} as Employee;
  submiterror: any;

  departments!: DepartmentCollection;
  pending_departments: boolean = false;
  selectedDepartmentId: number = -1;

  areas!: AreaCollection;
  pending_areas: boolean = false;
  selectedAreaId: number = -1;

  sections!: SectionCollection;
  pending_sections: boolean = false;
  selectedSectionId: number = -1;

  supervisiongroups!: SupervisionGroupCollection;
  pending_supervisiongroups: boolean = false;
  selectedSupervisionGroupId: number = -1;

  shifts!: ShiftCollection;
  pending_shifts: boolean = false;
  selectedShiftId: number = -1;

  incidences_groups!: IncidencesGroupCollection;
  pending_incidences_groups: boolean = false;
  selectedIncidencesGroupId: number = -1;

  submitted: boolean = false;
  hidepassword: boolean = false;
  showDeleteConfirmation = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('employees').subscribe((employees) => {
      this.employees = employees.employees;
      this.pending = employees.pending;
      this.submiterror = employees.error;
    });
    //if (this.departments.meta === null)
    this.store.dispatch(
      organizationActions.loadDepartments({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as DepartmentSearch,
      })
    );

    this.store.select('departments').subscribe((departments) => {
      this.departments = departments.departments;
      this.pending_departments = departments.pending;
    });

    //if (this.areas.meta === null)
    this.store.dispatch(
      organizationActions.loadAreas({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as AreaSearch,
      })
    );

    this.store.select('areas').subscribe((areas) => {
      this.areas = areas.areas;
      this.pending_areas = areas.pending;
    });

    //if (this.sections.meta === null)
    this.store.dispatch(
      organizationActions.loadSections({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as SectionSearch,
      })
    );

    this.store.select('sections').subscribe((sections) => {
      this.sections = sections.sections;
      this.pending_sections = sections.pending;
    });

    //if (this.supervisiongroups.meta === null)
    this.store.dispatch(
      organizationActions.loadSupervisionGroups({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as SupervisionGroupSearch,
      })
    );

    this.store.select('supervisiongroups').subscribe((supervisiongroups) => {
      this.supervisiongroups = supervisiongroups.supervisiongroups;
      this.pending_supervisiongroups = supervisiongroups.pending;
    });

    //if (this.shifts.meta === null)
    this.store.dispatch(
      shiftsActions.loadShifts({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as ShiftSearch,
      })
    );

    this.store.select('shifts').subscribe((shifts) => {
      this.shifts = shifts.shifts;
      this.pending_shifts = shifts.pending;
    });

    //if (this.incidences_groups.meta === null)
    this.store.dispatch(
      incidencesActions.loadIncidencesGroups({
        display: {
          page: '1',
          per_page: '10000',
          sort_field: 'code',
          sort_direction: 'asc',
        },
        search: {} as IncidencesGroupSearch,
      })
    );

    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidences_groups = incidencesgroups.incidencesgroups;
      this.pending_incidences_groups = incidencesgroups.pending;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_employee: any = (this.employees?.data.find(
        (employee: any) => employee.id === id
      ) || {}) as Employee;
      if (the_employee !== {}) {
        this.employee = the_employee;
      }
    });

    this.selectedDepartmentId = this.employee.department?.id || -1;
    this.selectedAreaId = this.employee.area?.id || -1;
    this.selectedSectionId = this.employee.section?.id || -1;
    this.selectedSupervisionGroupId = this.employee.supervision_group?.id || -1;
    this.selectedShiftId = this.employee.default_shift?.id || -1;
    this.selectedIncidencesGroupId = this.employee.incidences_group?.id || -1;
    this.submitted = false;

    this.employeeForm = this.formBuilder.group(
      {
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
            Validators.required,
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
        start_date: [
          this.employee.start_date || dateAAAAMMDD(new Date(Date.now())),
          [Validators.required],
        ],
        end_date: [this.employee.end_date],
        //        supervision_group_id: [this.employee.supervision_group_id],
        username: [this.employee.user?.username /*[Validators.***]*/],
        password: [
          {
            value: '',
            disabled: this.employee.id !== undefined,
          } /*[Validators.***]*/,
        ],
        is_admin: [this.employee.user?.is_admin],
        is_blocked: [this.employee.user?.is_blocked],
      },
      { validator: rangeValidator }
    );
  }

  ispending() {
    return (
      this.pending ||
      this.pending_departments ||
      this.pending_areas ||
      this.pending_sections ||
      this.pending_supervisiongroups ||
      this.pending_shifts ||
      this.pending_incidences_groups
    );
  }

  getColourItemsArray(items: any[]): ColourDropdownItem[] {
    return items.map((item: any) => {
      return { ...item, colour: 'bg-gray-300' };
    });
  }

  togglePassword() {
    if (this.employeeForm.get('password')?.disabled)
      this.employeeForm.get('password')?.enable();
    else this.employeeForm.get('password')?.disable();
  }

  askDelete() {
    this.showDeleteConfirmation = true;
    return;
  }

  actionDelete(proceed: boolean) {
    this.showDeleteConfirmation = false;
    if (proceed)
      this.store.dispatch(
        employeesActions.deleteEmployee({ id: this.employee.id })
      );
  }

  onSubmit() {
    /* A les accions es passa empleat+usuari */
    this.submitted = true;
    let employeeToSave = {
      ...this.employeeForm.value,
      department_id:
        this.selectedDepartmentId === -1 ? null : this.selectedDepartmentId,
      area_id: this.selectedAreaId === -1 ? null : this.selectedAreaId,
      section_id: this.selectedSectionId === -1 ? null : this.selectedSectionId,
      supervision_group_id:
        this.selectedSupervisionGroupId === -1
          ? null
          : this.selectedSupervisionGroupId,
      shift_id: this.selectedShiftId === -1 ? null : this.selectedShiftId,
      incidences_group_id:
        this.selectedIncidencesGroupId === -1
          ? null
          : this.selectedIncidencesGroupId,
    };
    if (this.employee.id == null) {
      this.store.dispatch(
        employeesActions.addEmployee({ employee: employeeToSave })
      );
    } else {
      employeeToSave = { id: this.employee.id, ...employeeToSave };
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
    } else if (fc.hasError('email')) {
      return 'Invalid email address';
    } else if (fc.hasError('min')) {
      return label + ' has to be at least 1';
    } else if (fc.hasError('rangenotvalid')) {
      return 'Invalid date range';
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
