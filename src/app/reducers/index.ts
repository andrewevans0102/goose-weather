import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeatherActionTypes } from '../actions/weather.actions';

export interface WeatherState {
  weatherData: WeatherData;
}

const initialWeatherState: WeatherState = {
  weatherData: new WeatherData()
};

export interface AppState {
  weather: WeatherState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadAction:
      return {
        weatherData: action.payload.weatherData
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
