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
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';

import * as incidencesActions from '../../../incidence/actions';

@Component({
  selector: 'app-incidence-edit',
  templateUrl: './incidence-edit.component.html',
  styleUrls: ['./incidence-edit.component.css'],
})
export class IncidenceEditComponent implements OnInit {
  incidenceForm!: FormGroup;
  incidences!: IncidenceCollection;
  incidence: Incidence = {} as Incidence;
  pending: boolean = false;

  colourItem: ColourCollectionItem = { name: 'bg-gray-50', colour: '#F9FAFB' };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('incidences').subscribe((incidences) => {
      this.incidences = incidences.incidences;
      this.pending = incidences.pending;
    });
    this.colourItem = { name: 'bg-gray-50', colour: '#F9FAFB' };
    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_incidence: any = (this.incidences?.data.find(
        (incidence: any) => incidence.id === id
      ) || {}) as Incidence;
      if (the_incidence !== {}) {
        this.incidence = the_incidence;
        this.colourItem.name = this.incidence.colour
          ? this.incidence.colour
          : this.colourItem.name;
        this.colourItem.colour = getFromName(this.colourItem.name).colour;
      }
    });

    this.incidenceForm = this.formBuilder.group({
      code: [
        this.incidence.code,
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      description: [
        this.incidence.description,
        [Validators.required, Validators.maxLength(50)],
      ],
      is_counted: [
        this.incidence.is_counted ? this.incidence.is_counted : true,
      ],
      is_absence: [
        this.incidence.is_absence ? this.incidence.is_absence : true,
      ],
    });
  }

  onSubmit() {
    let incidenceToSave = {
      ...this.incidenceForm.value,
      colour: this.colourItem.name,
    };
    console.log(this.colourItem);
    console.log(incidenceToSave);
    if (this.incidence.id == null) {
      this.store.dispatch(
        incidencesActions.addIncidence({ incidence: incidenceToSave })
      );
    } else {
      incidenceToSave = {
        id: this.incidence.id,
        ...incidenceToSave,
      };
      this.store.dispatch(
        incidencesActions.updateIncidence({ incidence: incidenceToSave })
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
