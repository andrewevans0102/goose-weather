import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadWeather } from './weather.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { WeatherService } from './weather.service';
import { LocationActionTypes, LocationsError, LoadLocations } from './location.actions';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {

  @Effect()
  loadLocation$ = this.actions$
    .pipe(
      ofType<LoadLocations>(LocationActionTypes.LoadLocations),
      mergeMap((action) => this.weatherService.getWeather(action.payload.locationData)
      .pipe(
        map(weather => {
          return (new LoadWeather({weatherData: weather}));
        }),
        catchError((errorMessage) => of(new LocationsError({error: errorMessage})))
      ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private weatherService: WeatherService) { }

}
