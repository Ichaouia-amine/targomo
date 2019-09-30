import { Action } from '@ngrx/store';
import { Stop } from '../model/models';

export enum StopActionTypes {
  LoadStops = '[Stop] Load Stops',
  LoadStopsSuccess = '[Stop] Load Stops Success',
  LoadStopsFailure = '[Stop] Load Stops Failure',
}

export class LoadStops implements Action {
  readonly type = StopActionTypes.LoadStops;
}
export class LoadStopsSuccess implements Action {
  readonly type = StopActionTypes.LoadStopsSuccess;
  constructor(public payload: Array<Stop>) {}
}
export class LoadStopsFailure implements Action {
  readonly type = StopActionTypes.LoadStopsFailure;
  constructor(public payload: Error) {}
}

export type StopActions = LoadStops | LoadStopsSuccess | LoadStopsFailure;
