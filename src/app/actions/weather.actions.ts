import { Action } from '@ngrx/store';
import { WeatherData } from '../models/weather-data/weather-data';

export enum WeatherActionTypes {
  LoadAction = '[Load] Action'
}

export class Load implements Action {
  readonly type = WeatherActionTypes.LoadAction;

  constructor(public payload: {weatherData: WeatherData}) {

  }
}


export type WeatherActions = Load;
