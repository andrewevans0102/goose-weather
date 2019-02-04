import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { WeatherComponent } from './weather/weather.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherWeekComponent } from './cards/weather-week/weather-week.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { CurrentConditionsComponent } from './cards/current-conditions/current-conditions.component';
import { WeatherHourlyComponent } from './cards/weather-hourly/weather-hourly.component';
import { WeatherDiscussionComponent } from './cards/weather-discussion/weather-discussion.component';
import { AboutComponent } from './cards/about/about.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: '',
    redirectTo: '/weather',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    PageNotFoundComponent,
    WeatherWeekComponent,
    CurrentConditionsComponent,
    WeatherHourlyComponent,
    WeatherDiscussionComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
