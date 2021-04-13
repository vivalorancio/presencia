import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as authenticationActions from 'src/app/views/authentication/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select('authentication', 'user').subscribe((user) => {
      if (user?.username) {
        const link = user?.is_admin ? '/management' : '/dashboard';
        this.router.navigate([link]);
      }
    });
  }
}
