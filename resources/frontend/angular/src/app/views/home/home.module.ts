import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ManagementComponent } from './management/management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ClockModule } from 'src/app/shared/clock/clock.module';
import { ColourDropdownModule } from 'src/app/shared/colour-dropdown/colour-dropdown.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotificationsModule } from 'src/app/shared/notifications/notifications.module';

@NgModule({
  declarations: [ManagementComponent, DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClockModule,
    ColourDropdownModule,
    ClickOutsideModule,
    NotificationsModule,
  ],
  exports: [ClickOutsideModule],
})
export class HomeModule {}
