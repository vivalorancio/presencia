import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import * as authenticationActions from 'src/app/views/authentication/actions';
import {
  dashboardMenu,
  managementMenu,
  MenuItem,
  initManagementStore,
  initDashboardStore,
} from 'src/app/views/home/menu';
import { Employee } from '../../models/employee.model';
//import * as menus from 'src/app/views/home/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  employee!: Employee;
  mainmodule!: string;
  openmain: boolean = false;

  managementMenu = managementMenu;
  dashboardMenu = dashboardMenu;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('authentication').subscribe((authentication) => {
      this.user = authentication.user?.username ? authentication.user : null;
      this.employee = authentication.employee.data;
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

  navigateDashboard(link: string): void {
    initDashboardStore(this.store, link, this.employee?.id);
  }

  navigateManagement(link: string): void {
    initManagementStore(this.store, link);
  }
}
