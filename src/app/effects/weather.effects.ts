import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WeatherActionTypes, Load } from '../actions/weather.actions';
import { tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { WeatherData } from '../models/weather-data/weather-data';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';





@Injectable()
export class WeatherEffects {

  @Effect({dispatch: false})
  weather$ = this.actions$.pipe(
    ofType<Load>(WeatherActionTypes.LoadAction),
    tap(action => {
      console.log('effect initiated, weather$');
      return localStorage.setItem('weather', JSON.stringify(action.payload.weatherData));
    })
  );

  @Effect()
  init$ = defer(() => {
    console.log('effect initated init$');
    const weatherData = localStorage.getItem('weather');
    if (weatherData) {
      return of(new Load({weatherData: JSON.parse(weatherData)}));
    } else {
      return of(new Load({weatherData: new WeatherData()}));
    }
  });

  constructor(private actions$: Actions, private store: Store<AppState>) {}

}
