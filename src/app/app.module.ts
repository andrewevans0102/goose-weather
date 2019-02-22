import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CurrentConditionsComponent } from './cards/current-conditions/current-conditions.component';
import { WeatherDiscussionComponent } from './cards/weather-discussion/weather-discussion.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { WeeklyForecastComponent } from './cards/weekly-forecast/weekly-forecast.component';
import { HourlyForecastComponent } from './cards/hourly-forecast/hourly-forecast.component';
import { AboutMobileComponent } from './cards/about-mobile/about-mobile.component';
import { AboutDesktopComponent } from './cards/about-desktop/about-desktop.component';
import { NgxdModule } from '@ngxd/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    PageNotFoundComponent,
    CurrentConditionsComponent,
    WeatherDiscussionComponent,
    WeeklyForecastComponent,
    HourlyForecastComponent,
    AboutMobileComponent,
    AboutDesktopComponent
  ],
  entryComponents: [
    CurrentConditionsComponent,
    WeatherDiscussionComponent,
    WeeklyForecastComponent,
    HourlyForecastComponent,
    AboutDesktopComponent,
    AboutMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    LayoutModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
