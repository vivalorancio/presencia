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

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('authentication', 'error').subscribe((error) => {
      this.loginerror = error;
    });
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  submit(): void {
    this.store.dispatch(authenticationActions.login({ ...this.form.value }));
  }
}
