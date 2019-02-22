import { Action } from '@ngrx/store';
import { LocationData } from '../models/location-data/location-data';

export enum LocationActionTypes {
  LoadLocations = '[Location] Load Locations',
  UpdateLocations = '[Location] Update Locations',
  LocationsError = '[Location] Locations Error'
}

export class LocationAction implements Action {
  type: string;
  payload: {
    locationData: LocationData
  };
}

export class LoadLocations implements Action {
  readonly type = LocationActionTypes.LoadLocations;

  constructor(readonly payload: {locationData: LocationData}) {

  }
}

export class UpdateLocations implements Action {
  readonly type = LocationActionTypes.UpdateLocations;

  constructor(readonly payload: {locationData: LocationData}) {

  }
}

export class LocationsError implements Action {
  readonly type = LocationActionTypes.LocationsError;

  constructor() {
    alert('Error occured when loading weather');
  }
}


export type ActiopnsUnion = UpdateLocations | LocationsError;
