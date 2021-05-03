import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as authenticationActions from 'src/app/views/authentication/actions';
import {
  dashboardMenu,
  managementMenu,
  MenuItem,
} from 'src/app/views/home/menu';
//import * as menus from 'src/app/views/home/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  mainmodule!: string;
  openmain: boolean = false;

  managementMenu = managementMenu;
  dashboardMenu = dashboardMenu;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('authentication', 'user').subscribe((user) => {
      this.user = user?.username ? user : null;
    });
    this.mainmodule = this.route.snapshot.url[0]?.path;
    console.log(this.route.snapshot);
  }

  logout(): void {
    this.store.dispatch(authenticationActions.logout());
  }

  togglemain(): void {
    this.openmain = !this.openmain;
  }

  closemain(): void {
    this.openmain = false;
  }

  togglemenu(menuitem: MenuItem): void {
    menuitem.open = !menuitem.open;
  }
  closemenu(menuitem: MenuItem): void {
    menuitem.open = false;
  }
}
