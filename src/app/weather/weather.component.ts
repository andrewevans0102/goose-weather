import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather-data/weather-data';
import { CurrentConditionsComponent } from '../cards/current-conditions/current-conditions.component';
import { WeatherDiscussionComponent } from '../cards/weather-discussion/weather-discussion.component';
import { WeeklyForecastComponent } from '../cards/weekly-forecast/weekly-forecast.component';
import { HourlyForecastComponent } from '../cards/hourly-forecast/hourly-forecast.component';
import { AboutDesktopComponent } from '../cards/about-desktop/about-desktop.component';
import { AboutMobileComponent } from '../cards/about-mobile/about-mobile.component';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Load } from '../actions/weather.actions';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  lat: string;
  long: string;
  weatherData: WeatherData = new WeatherData();
  cardsDesktop = [];
  cardsMobile = [];
  displayValues = false;
  spinnerColor = 'primary';
  spinnerSize = 8;

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return this.cardsMobile;
      } else {
        return this.cardsDesktop;
      }
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, public weatherService: WeatherService, private store: Store<AppState>) {
    // desktop view
    this.cardsDesktop = [
      {
        title: 'Current Conditions',
        cols: 1,
        rows: 1,
        component: CurrentConditionsComponent
      },
      {
        title: 'Hourly Forecast',
        cols: 1,
        rows: 1,
        component: HourlyForecastComponent
      },
      {
        title: 'Weather Discussion',
        cols: 1,
        rows: 2,
        component: WeatherDiscussionComponent
      },
      {
        title: 'Weekly Forecast',
        cols: 2,
        rows: 1,
        component: WeeklyForecastComponent
      },
      {
        title: 'About',
        cols: 3,
        rows: 1,
        component: AboutDesktopComponent
      }
    ];

    // Mobile View
    this.cardsMobile = [
      {
        title: 'Current Conditions',
        cols: 3,
        rows: 1,
        component: CurrentConditionsComponent
      },
      {
        title: 'Hourly Forecast',
        cols: 3,
        rows: 1,
        component: HourlyForecastComponent
      },
      {
        title: 'Weather Discussion',
        cols: 3,
        rows: 2,
        component: WeatherDiscussionComponent
      },
      {
        title: 'Weekly Forecast',
        cols: 3,
        rows: 1,
        component: WeeklyForecastComponent
      },
      {
        title: 'About',
        cols: 3,
        rows: 2,
        component: AboutMobileComponent
      }
    ];
  }

  ngOnInit(): void {

    this.store
      .pipe(
        map(state => this.weatherData = state.weather.weatherData)
      );


    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.savePosition(position);
      });
    } catch (error) {
      alert('Browser does not support location services');
    }
  }

  savePosition(position) {
    this.lat = position.coords.latitude.toFixed(4).toString();
    this.long = position.coords.longitude.toFixed(4).toString();

    this.weatherService.getWeather(this.lat, this.long)
      .then((resolve) => {
        this.weatherData = resolve;
        this.displayValues = true;

        this.store.dispatch(new Load({weatherData: this.weatherData}));

        if (this.weatherData.errorMessage !== '') {
          alert(this.weatherData.errorMessage);
        }
      })
      .catch((error) => { alert(error); });

  }
}
