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
  IncidencesGroup,
  IncidencesGroupCollection,
} from 'src/app/shared/models/incidence.model';

import * as incidencesActions from '../../../incidence/actions';

@Component({
  selector: 'app-incidencesgroup-edit',
  templateUrl: './incidencesgroup-edit.component.html',
  styleUrls: ['./incidencesgroup-edit.component.css'],
})
export class IncidencesgroupEditComponent implements OnInit {
  incidencesgroupForm!: FormGroup;
  incidencesgroups!: IncidencesGroupCollection;
  incidencesgroup: IncidencesGroup = {} as IncidencesGroup;
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
    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidencesgroups = incidencesgroups.incidencesgroups;
      this.pending = incidencesgroups.pending;
      this.submiterror = incidencesgroups.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_incidencesgroup: any = (this.incidencesgroups?.data.find(
        (incidencesgroup: any) => incidencesgroup.id === id
      ) || {}) as IncidencesGroup;
      if (the_incidencesgroup !== {}) {
        this.incidencesgroup = the_incidencesgroup;
      }
    });

    this.submitted = false;

    this.incidencesgroupForm = this.formBuilder.group({
      code: [
        this.incidencesgroup.code,
        [Validators.required, Validators.maxLength(3)],
      ],
      description: [
        this.incidencesgroup.description,
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
        incidencesActions.deleteIncidencesGroup({ id: this.incidencesgroup.id })
      );
  }
  onSubmit() {
    this.submitted = true;
    let incidencesgroupToSave = {
      ...this.incidencesgroupForm.value,
    };
    incidencesgroupToSave.code = incidencesgroupToSave.code.toUpperCase();

    if (this.incidencesgroup.id == null) {
      this.store.dispatch(
        incidencesActions.addIncidencesGroup({
          incidencesgroup: incidencesgroupToSave,
        })
      );
    } else {
      incidencesgroupToSave = {
        id: this.incidencesgroup.id,
        ...incidencesgroupToSave,
      };
      this.store.dispatch(
        incidencesActions.updateIncidencesGroup({
          incidencesgroup: incidencesgroupToSave,
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
