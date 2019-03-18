import { Action } from '@ngrx/store';
import { LocationData } from '../models/location-data/location-data';

export enum LocationActionTypes {
  LoadLocations = '[Home Page] Load Locations',
  LocationsError = '[Home Page] Locations Error'
}

export class LocationAction implements Action {
  type: string;
  payload: {
    locationData: LocationData,
    error: string
  };
}

export class LoadLocations implements Action {
  readonly type = LocationActionTypes.LoadLocations;

  constructor(readonly payload: {locationData: LocationData}) {

  }
}

export class LocationsError implements Action {
  readonly type = LocationActionTypes.LocationsError;

  constructor(readonly payload: {error: string}) {

  }
}


export type ActionsUnion = LoadLocations | LocationsError;
