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
  SupervisionGroup,
  SupervisionGroupCollection,
} from 'src/app/shared/models/organization.model';

import * as organizationActions from '../../actions';

@Component({
  selector: 'app-supervisiongroup-edit',
  templateUrl: './supervisiongroup-edit.component.html',
  styleUrls: ['./supervisiongroup-edit.component.css'],
})
export class SupervisiongroupEditComponent implements OnInit {
  supervisiongroupForm!: FormGroup;
  supervisiongroups!: SupervisionGroupCollection;
  supervisiongroup: SupervisionGroup = {} as SupervisionGroup;
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
    this.store.select('supervisiongroups').subscribe((supervisiongroups) => {
      this.supervisiongroups = supervisiongroups.supervisiongroups;
      this.pending = supervisiongroups.pending;
      this.submiterror = supervisiongroups.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_supervisiongroup: any = (this.supervisiongroups?.data.find(
        (supervisiongroup: any) => supervisiongroup.id === id
      ) || {}) as SupervisionGroup;
      if (the_supervisiongroup !== {}) {
        this.supervisiongroup = the_supervisiongroup;
      }
    });

    this.submitted = false;

    this.supervisiongroupForm = this.formBuilder.group({
      code: [
        this.supervisiongroup.code,
        [Validators.required, Validators.maxLength(3)],
      ],
      description: [
        this.supervisiongroup.description,
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
        organizationActions.deleteSupervisionGroup({
          id: this.supervisiongroup.id,
        })
      );
  }
  onSubmit() {
    this.submitted = true;
    let supervisiongroupToSave = {
      ...this.supervisiongroupForm.value,
    };
    supervisiongroupToSave.code = supervisiongroupToSave.code.toUpperCase();

    if (this.supervisiongroup.id == null) {
      this.store.dispatch(
        organizationActions.addSupervisionGroup({
          supervisiongroup: supervisiongroupToSave,
        })
      );
    } else {
      supervisiongroupToSave = {
        id: this.supervisiongroup.id,
        ...supervisiongroupToSave,
      };
      this.store.dispatch(
        organizationActions.updateSupervisionGroup({
          supervisiongroup: supervisiongroupToSave,
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
