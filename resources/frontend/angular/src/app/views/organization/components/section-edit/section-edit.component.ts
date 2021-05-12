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
  Section,
  SectionCollection,
} from 'src/app/shared/models/organization.model';

import * as organizationActions from '../../../organization/actions';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.css'],
})
export class SectionEditComponent implements OnInit {
  sectionForm!: FormGroup;
  sections!: SectionCollection;
  section: Section = {} as Section;
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
    this.store.select('sections').subscribe((sections) => {
      this.sections = sections.sections;
      this.pending = sections.pending;
      this.submiterror = sections.error;
    });

    this.route.params.subscribe((params) => {
      const id = +params.id;
      const the_section: any = (this.sections?.data.find(
        (section: any) => section.id === id
      ) || {}) as Section;
      if (the_section !== {}) {
        this.section = the_section;
      }
    });

    this.submitted = false;

    this.sectionForm = this.formBuilder.group({
      code: [this.section.code, [Validators.required, Validators.maxLength(3)]],
      description: [
        this.section.description,
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
        organizationActions.deleteSection({ id: this.section.id })
      );
  }
  onSubmit() {
    this.submitted = true;
    let sectionToSave = {
      ...this.sectionForm.value,
    };
    sectionToSave.code = sectionToSave.code.toUpperCase();

    if (this.section.id == null) {
      this.store.dispatch(
        organizationActions.addSection({
          section: sectionToSave,
        })
      );
    } else {
      sectionToSave = {
        id: this.section.id,
        ...sectionToSave,
      };
      this.store.dispatch(
        organizationActions.updateSection({
          section: sectionToSave,
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
