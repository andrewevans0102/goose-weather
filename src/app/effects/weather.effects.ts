import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadWeather } from '../actions/weather.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { WeatherService } from '../services/weather.service';
import { LocationActionTypes, LocationsError, LoadLocations } from '../actions/location.actions';
import { of, throwError } from 'rxjs';

@Injectable()
export class WeatherEffects {

  @Effect({dispatch: false})
  loadLocation$ = this.actions$
    .pipe(
      ofType<LoadLocations>(LocationActionTypes.LoadLocations),
      mergeMap((action) => this.weatherService.getWeather(action.payload.locationData)
        .pipe(
          map(weather => {
            this.store.dispatch(new LoadWeather({weatherData: weather}));
          }),
          catchError((errorMessage) => throwError(this.store.dispatch(new LocationsError({locationData: null, error: errorMessage}))))
        ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private weatherService: WeatherService) { }

}
