import { Action } from '@ngrx/store';
import { WeatherData } from '../models/weather-data/weather-data';

export enum WeatherActionTypes {
  LoadWeather = '[Home Page] Load Weather'
}

export class WeatherAction implements Action {
  type: string;
  payload: {
    weatherData: WeatherData
  };
}

export class LoadWeather implements Action {
  readonly type = WeatherActionTypes.LoadWeather;

  constructor(readonly payload: {weatherData: WeatherData}) {

  }
}


export type WeatherActions = LoadWeather;
