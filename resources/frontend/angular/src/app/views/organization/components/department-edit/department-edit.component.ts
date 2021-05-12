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
  Department,
  DepartmentCollection,
} from 'src/app/shared/models/organization.model';

import * as organizationActions from '../../../organization/actions';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit {
  departmentForm!: FormGroup;
  departments!: DepartmentCollection;
  department: Department = {} as Department;
  pending: boolean = false;
  submiterror: any;

  submitted: boolean = false;
  showDeleteConfirmation = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('departments').subscribe((departments) => {
      this.departments = departments.departments;
      this.pending = departments.pending;
      this.submiterror = departments.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_department: any = (this.departments?.data.find(
        (department: any) => department.id === id
      ) || {}) as Department;
      if (the_department !== {}) {
        this.department = the_department;
      }
    });

    this.submitted = false;

    this.departmentForm = this.formBuilder.group({
      code: [
        this.department.code,
        [Validators.required, Validators.maxLength(3)],
      ],
      description: [
        this.department.description,
        [Validators.required, Validators.maxLength(50)],
      ],
    });
  }

  askDelete() {
    this.showDeleteConfirmation = true;
    return;
  }

  actionDelete(proceed: boolean) {
    this.showDeleteConfirmation = false;
    if (proceed)
      this.store.dispatch(
        organizationActions.deleteDepartment({ id: this.department.id })
      );
  }
  onSubmit() {
    this.submitted = true;
    let departmentToSave = {
      ...this.departmentForm.value,
    };
    departmentToSave.code = departmentToSave.code.toUpperCase();

    if (this.department.id == null) {
      this.store.dispatch(
        organizationActions.addDepartment({
          department: departmentToSave,
        })
      );
    } else {
      departmentToSave = {
        id: this.department.id,
        ...departmentToSave,
      };
      this.store.dispatch(
        organizationActions.updateDepartment({
          department: departmentToSave,
        })
      );
    }
  }

  getControlErrorMessage(fca: AbstractControl | null, label: string) {
    let fc = fca as AbstractControl;
    if (fc.hasError('required')) {
      return label + ' is required';
    } else if (fc.hasError('maxlength')) {
      return label + ' too long';
    } else if (fc.hasError('min')) {
      return label + ' has to be at least 1900';
    } else if (fc.hasError('max')) {
      return label + ' has to be less than 2999';
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
