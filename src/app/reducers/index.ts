import { ActionReducerMap, MetaReducer, ActionReducer, INIT, UPDATE} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeatherActionTypes } from '../actions/weather.actions';
import { LocationActionTypes } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';
import { createSelector } from '@ngrx/store';

export interface WeatherState {
  weatherData: WeatherData;
}

const initialWeatherState: WeatherState = {
  weatherData: null
};

export interface LocationState {
  location: LocationData;
}

const initialLocationState: LocationState = {
  location: null
};

export interface AppState {
  weather: WeatherState;
  location: LocationState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadWeather:
      return {
        weatherData: action.payload.weatherData
      };

    default:
      return state;
  }
}

export function locationReducer(state: LocationState = initialLocationState, action): LocationState {
  switch (action.type) {
    case LocationActionTypes.LoadLocations:
      return {
        location: action.payload.locationData
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  location: locationReducer
};

export function locationSync(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const reducedState = reducer(state, action);
    if (action.type === WeatherActionTypes.LoadWeather) {
      window.localStorage.setItem('weather', JSON.stringify(reducedState.weather.weatherData));
    }
    return reducedState;
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [locationSync] : [locationSync];
