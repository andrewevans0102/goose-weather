import { ActionReducerMap, MetaReducer, ActionReducer, INIT, UPDATE} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherData } from '../models/weather-data/weather-data';
import { WeatherActionTypes } from '../actions/weather.actions';
import { LocationActionTypes } from '../actions/location.actions';
import { LocationData } from '../models/location-data/location-data';

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
    case WeatherActionTypes.LoadAction:
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
      console.log('location reducer has been called bonbon');
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
    let reducedState = reducer(state, action);
    if (action.type === INIT) {
      const data = window.localStorage.getItem('weather');
      if (data) {
        console.log('meatareducer init');
        const weatherDataLocalStorage: WeatherData = JSON.parse(data);
        if (weatherDataLocalStorage === null) {
          console.log('local storage found null in meta reducer');
          window.localStorage.removeItem('weather');
        } else {
          console.log('local storage found good in meta reducer');
          // update if data is older than 5 minutes
          const nowDate = new Date();
          const lastFiveMin = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(),
            nowDate.getMinutes() - 1);
          const compareTime = new Date(weatherDataLocalStorage.weatherDate);
          if (compareTime < lastFiveMin) {
            console.log('local storage removed in metareducer 5 minutes thing');
            window.localStorage.removeItem('weather');
          }
        }
        reducedState = {
          ...reducedState
        };
      }
    } else if (action.type === WeatherActionTypes.LoadAction) {
      console.log('local storage for weather updated in metareducer');
      console.log(action);
      console.log(reducedState.weather.weatherData);
      window.localStorage.setItem('weather', JSON.stringify(reducedState.weather.weatherData));
    }
    return reducedState;
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [locationSync] : [locationSync];
