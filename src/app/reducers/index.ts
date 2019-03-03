import { ActionReducerMap, MetaReducer, Action} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeatherActionTypes, WeatherAction } from '../actions/weather.actions';
import { LocationActionTypes, LocationAction } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

export interface WeatherState {
  weatherData: WeatherData| null;
}

const initialWeatherState: WeatherState = {
  weatherData: null
};

export interface LocationState {
  location: LocationData| null;
  error: string| null;
}

const initialLocationState: LocationState = {
  location: null,
  error: null
};

export interface AppState {
  weather: WeatherState;
  location: LocationState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadWeather:
      return {
        weatherData: action.payload.weatherData
      };

    default:
      return state;
  }
}

export function locationReducer(state: LocationState = initialLocationState, action: LocationAction): LocationState {
  switch (action.type) {
    case LocationActionTypes.LoadLocations:
      return {
        location: action.payload.locationData,
        error: null
      };

    case LocationActionTypes.LocationsError:
      return {
        location: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  location: locationReducer
};

export const selectWeather = (state: AppState) => state.weather.weatherData;

export const selectError = (state: AppState) => state.location.error;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
