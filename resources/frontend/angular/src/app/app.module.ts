import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { EmployeeModule } from './views/employee/employee.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MainComponent } from './shared/layout/main/main.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeModule } from './views/home/home.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
