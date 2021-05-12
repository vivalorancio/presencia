import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MainComponent } from './shared/layout/main/main.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeModule } from './views/home/home.module';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './views/authentication/effects';
import { EmployeeModule } from './views/employee/employee.module';
import { EmployeesEffects } from './views/employee/effects';
import { ShiftModule } from './views/shift/shift.module';
import { ShiftsEffects } from './views/shift/effects';
import { CalendarModule } from './views/calendar/calendar.module';
import { CalendarsEffects } from './views/calendar/effects';
import { IncidenceModule } from './views/incidence/incidence.module';
import { IncidencesEffects } from './views/incidence/effects';
import { OrganizationModule } from './views/organization/organization.module';
import { OrganizationEffects } from './views/organization/effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    AuthenticationModule,
    EmployeeModule,
    ShiftModule,
    CalendarModule,
    IncidenceModule,
    OrganizationModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      EmployeesEffects,
      ShiftsEffects,
      CalendarsEffects,
      IncidencesEffects,
      OrganizationEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
