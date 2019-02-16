import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Load } from '../actions/weather.actions';
import { map } from 'rxjs/operators';
import { WeatherData } from '../models/weather-data/weather-data';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import { LoadLocations, LocationActionTypes } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

@Injectable()
export class WeatherEffects {

  @Effect({dispatch: false})
  location$ = this.actions$.pipe(
    ofType<LoadLocations>(LocationActionTypes.LoadLocations),
    map(action => {
      const weatherDataLocalStorage: WeatherData = JSON.parse(localStorage.getItem('weather'));
      let callService = false;
      callService = this.checkIfNeedToCallWeatherService(weatherDataLocalStorage, action.payload.locationData);
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
    }
  }

  constructor(private actions$: Actions, private store: Store<AppState>, private weatherService: WeatherService) { }

}
