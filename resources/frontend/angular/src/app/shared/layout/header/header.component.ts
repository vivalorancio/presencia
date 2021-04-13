import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as authenticationActions from 'src/app/views/authentication/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('authentication', 'user').subscribe((user) => {
      this.user = user?.username ? user : null;
    });
  }

  logout(): void {
    this.store.dispatch(authenticationActions.logout());
  }
}
