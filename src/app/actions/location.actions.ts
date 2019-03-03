import { Action } from '@ngrx/store';
import { LocationData } from '../models/location-data/location-data';

export enum LocationActionTypes {
  LoadLocations = '[Location] Load Locations',
  LocationsError = '[Location] Locations Error'
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

  constructor(readonly payload: {locationData: LocationData, error: null}) {

  }
}

export class LocationsError implements Action {
  readonly type = LocationActionTypes.LocationsError;

  constructor(readonly payload: {locationData: null, error: string}) {

  }
}


export type ActionsUnion = LoadLocations | LocationsError;
