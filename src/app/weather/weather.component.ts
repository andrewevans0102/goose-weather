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
import { UpdateLocations, LoadLocations } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  lat: string;
  long: string;
  cardsDesktop = [];
  cardsMobile = [];
  displayValues = false;
  spinnerColor = 'primary';
  spinnerSize = 8;
  locationData: LocationData = new LocationData();

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
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.savePosition(position);
      });
    } catch (error) {
      alert('Browser does not support location services');
    }
  }

  savePosition(position) {
    this.locationData.latitude = position.coords.latitude.toFixed(4).toString();
    this.locationData.longitude = position.coords.longitude.toFixed(4).toString();

    // check local storage for updates
    const localStorageWeatherData = window.localStorage.getItem('weather');
    const weatherDataLocalStorage: WeatherData = JSON.parse(localStorageWeatherData);
    const updateWeather = this.checkStoreDataForUpdates(weatherDataLocalStorage, this.locationData);
    if (updateWeather) {
      // side effect is update weather
      this.store.dispatch(new UpdateLocations({locationData: this.locationData}));
    } else {
      this.store.dispatch(new LoadLocations({locationData: this.locationData}));
    }
  }

  checkStoreDataForUpdates(weatherData: WeatherData, locationData: LocationData): boolean {
    if (weatherData === null || weatherData === undefined) {
      return true;
    } else {
      if (weatherData.currentConditions.longitude !== locationData.longitude ||
          weatherData.currentConditions.latitude !== locationData.latitude) {
          // update if coordinates are different
          return true;
      }

      // update if data is older than 30 minutes
      const nowDate = new Date();
      const lastThirtyMin = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(),
        nowDate.getMinutes() - 30);
      // put date in same format for comparision
      const compareTime = new Date(weatherData.weatherDate);
      if (compareTime < lastThirtyMin) {
        return true;
      }
    }
  }
}
