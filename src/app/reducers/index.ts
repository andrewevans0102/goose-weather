import { ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeatherActionTypes } from '../actions/weather.actions';
import { LocationActionTypes } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

export interface WeatherState {
  weatherData: WeatherData;
  locationData: LocationData;
}

const initialWeatherState: WeatherState = {
  weatherData: new WeatherData(),
  locationData: new LocationData()
};

export interface LocationState {
  location: LocationData;
}

const initialLocationState: LocationState = {
  location: new LocationData()
};

export interface AppState {
  weather: WeatherState;
  location: LocationState;
}

export function weatherReducer(state: WeatherState = initialWeatherState, action): WeatherState {
  switch (action.type) {
    case WeatherActionTypes.LoadAction:
      return {
        weatherData: action.payload.weatherData,
        // load in coordinates so state is maintained
        // otherwise it will get wiped when the dispatch is called
        locationData: {
          latitude: action.payload.weatherData.currentConditions.latitude,
          longitude: action.payload.weatherData.currentConditions.longitude
        }
      };

    default:
      return state;
  }
}

export function locationReducer(state: LocationState = initialLocationState, action): LocationState {
  switch (action.type) {
    case LocationActionTypes.LoadLocations:
      return {
        location: action.payload.location
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {

  weather: weatherReducer,
  location: locationReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
