import { Action } from '@ngrx/store';
import { Stop } from '../model/models';

export enum StopActionTypes {
  LoadStops = '[Stop] Load Stops',
}

export class LoadStops implements Action {
  readonly type = StopActionTypes.LoadStops;
  constructor(public payload: Stop) {}
}


export type StopActions = LoadStops;
