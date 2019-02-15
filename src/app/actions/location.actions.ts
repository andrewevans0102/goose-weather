import { Action } from '@ngrx/store';
import { LocationData } from '../models/location-data/location-data';

export enum LocationActionTypes {
  LoadLocations = '[Location] Load Locations',
}

export class LoadLocations implements Action {
  readonly type = LocationActionTypes.LoadLocations;

  constructor(public payload: {locationData: LocationData}) {

  }
}


export type LocationActions = LoadLocations;
