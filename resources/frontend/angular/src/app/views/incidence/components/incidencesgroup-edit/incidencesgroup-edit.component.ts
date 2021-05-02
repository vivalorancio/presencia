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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('incidencesgroups').subscribe((incidencesgroups) => {
      this.incidencesgroups = incidencesgroups.incidencesgroups;
      this.pending = incidencesgroups.pending;
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

  onSubmit() {
    if (this.incidencesgroup.id == null) {
      this.store.dispatch(
        incidencesActions.addIncidencesGroup({
          incidencesgroup: this.incidencesgroupForm.value,
        })
      );
    } else {
      let incidencesgroupToSave = {
        id: this.incidencesgroup.id,
        ...this.incidencesgroupForm.value,
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
}
