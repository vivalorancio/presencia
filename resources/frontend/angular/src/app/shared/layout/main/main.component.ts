import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { User } from '../../models/user.model';

import * as authenticationActions from 'src/app/views/authentication/actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('authentication', 'user').subscribe((user) => {
      this.user = user?.username ? user : null;
    });
  }
}
