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
import { Area, AreaCollection } from 'src/app/shared/models/organization.model';

import * as organizationActions from '../../../organization/actions';

@Component({
  selector: 'app-area-edit',
  templateUrl: './area-edit.component.html',
  styleUrls: ['./area-edit.component.css'],
})
export class AreaEditComponent implements OnInit {
  areaForm!: FormGroup;
  areas!: AreaCollection;
  area: Area = {} as Area;
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
    this.store.select('areas').subscribe((areas) => {
      this.areas = areas.areas;
      this.pending = areas.pending;
      this.submiterror = areas.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_area: any = (this.areas?.data.find(
        (area: any) => area.id === id
      ) || {}) as Area;
      if (the_area !== {}) {
        this.area = the_area;
      }
    });

    this.submitted = false;

    this.areaForm = this.formBuilder.group({
      code: [this.area.code, [Validators.required, Validators.maxLength(3)]],
      description: [
        this.area.description,
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
      this.store.dispatch(organizationActions.deleteArea({ id: this.area.id }));
  }
  onSubmit() {
    this.submitted = true;
    let areaToSave = {
      ...this.areaForm.value,
    };
    areaToSave.code = areaToSave.code.toUpperCase();

    if (this.area.id == null) {
      this.store.dispatch(
        organizationActions.addArea({
          area: areaToSave,
        })
      );
    } else {
      areaToSave = {
        id: this.area.id,
        ...areaToSave,
      };
      this.store.dispatch(
        organizationActions.updateArea({
          area: areaToSave,
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
