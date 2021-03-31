import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ManagementComponent } from './management/management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ClockModule } from 'src/app/shared/clock/clock.module';

@NgModule({
  declarations: [ManagementComponent, DashboardComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ClockModule],
})
export class HomeModule {}
