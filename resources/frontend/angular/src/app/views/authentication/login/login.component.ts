import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as authenticationActions from '../actions';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  loginerror!: any;
  submitted: boolean = false;
  pending: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('authentication').subscribe((authentication) => {
      this.loginerror = authentication.error;
      this.pending = authentication.pending;
    });
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
    this.submitted = false;
  }

  submit(): void {
    this.submitted = true;
    this.store.dispatch(authenticationActions.login({ ...this.form.value }));
  }
}
