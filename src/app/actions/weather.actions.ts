import { Action } from '@ngrx/store';
import { WeatherData } from '../models/weather-data/weather-data';

export enum WeatherActionTypes {
  LoadWeather = '[Weather] Load Weather'
}

export class LoadWeather implements Action {
  readonly type = WeatherActionTypes.LoadWeather;

  constructor(public payload: {weatherData: WeatherData}) {

  }
}


export type WeatherActions = LoadWeather;
