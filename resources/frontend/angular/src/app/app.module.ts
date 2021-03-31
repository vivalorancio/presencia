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
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthenticationEffects, EmployeesEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
