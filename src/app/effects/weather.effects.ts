import { Injectable, OnInit } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WeatherActionTypes, Load } from '../actions/weather.actions';
import { tap } from 'rxjs/operators';
import { defer, of, Observable } from 'rxjs';
import { WeatherData } from '../models/weather-data/weather-data';
import { AppState } from '../reducers';
import { Store, Action } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import { LoadLocations, LocationActionTypes } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

@Injectable()
export class WeatherEffects {

  @Effect({dispatch: false})
  weather$ = this.actions$.pipe(
    ofType<Load>(WeatherActionTypes.LoadAction),
    tap(action => {
      return localStorage.setItem('weather', JSON.stringify(action.payload.weatherData));
    })
  );

  @Effect({dispatch: false})
  location$ = this.actions$.pipe(
    ofType<LoadLocations>(LocationActionTypes.LoadLocations),
    tap(action => {
      const weatherDataLocalStorage: WeatherData = JSON.parse(localStorage.getItem('weather'));
      const callService = this.checkIfNeedToCallWeatherService(weatherDataLocalStorage, action.payload.locationData);
      if (callService) {
        this.weatherService.getWeather(action.payload.locationData.latitude, action.payload.locationData.longitude)
          .then((weatherDataFromService) => {
            this.store.dispatch(new Load({weatherData: weatherDataFromService}));
          })
          .catch((error) => { alert(error); });
      } else {
        this.store.dispatch(new Load({weatherData: weatherDataLocalStorage}));
      }
  }));

  checkIfNeedToCallWeatherService(weatherData: WeatherData, locationData: LocationData): boolean {
    if (weatherData === null) {
      return true;
    } else {
      if (weatherData.currentConditions.longitude !== locationData.longitude ||
          weatherData.currentConditions.latitude !== locationData.latitude) {
          // update if coordinates are different
          return true;
      }

      const nowDate = new Date();
      const lastFiveMin = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(),
        nowDate.getMinutes() - 5);
      const compareTime = new Date(weatherData.weatherDate);
      if (compareTime < lastFiveMin) {
        // update if date is older than 5 minutes
        return true;
      }
    }
  }

  constructor(private actions$: Actions, private store: Store<AppState>, private weatherService: WeatherService) { }

}
