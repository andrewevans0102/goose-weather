import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadWeather } from '../actions/weather.actions';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { WeatherData } from '../models/weather-data/weather-data';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import { LocationActionTypes, LocationsError, UpdateLocations, LoadLocations } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';
import * as fromRoot from '../reducers';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class WeatherEffects {

  @Effect({dispatch: false})
  updateLocation$ = this.actions$
    .pipe(
      ofType<UpdateLocations>(LocationActionTypes.UpdateLocations),
      mergeMap((action) => this.weatherService.getWeather(action.payload.locationData)
        .pipe(
          map(weather => {
            this.store.dispatch(new LoadWeather({weatherData: weather}));
          }),
          catchError(() => of(new LocationsError()))
        ))
  );

  @Effect({dispatch: false})
  loadLocation$ = this.actions$
    .pipe(
      ofType<LoadLocations>(LocationActionTypes.LoadLocations),
      mergeMap((action) => this.weatherService.getWeatherLocalStorage()
        .pipe(
          map(weather => {
            this.store.dispatch(new LoadWeather({weatherData: weather}));
          }),
          catchError(() => of(new LocationsError()))
        ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private weatherService: WeatherService) { }

}
